import type { MonthRange } from '@/types/time'

/**
 * Calculates the start and end dates for the last six months, including the current month, based on the user's local time.
 *
 * The function generates an array of `MonthRange` objects, each containing:
 * - `startDate`: The first day of the month in `YYYY-MM-DD` format.
 * - `endDate`: The last day of the month in `YYYY-MM-DD` format.
 * - `label`: A human-readable label for the month (e.g., "Feb 2026").
 * @param date A reference date to calculate the last six months from. If not provided, the current date is used.
 * @returns An array of `MonthRange` objects for the last six months.
 */
function formatLocalDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}


/**
 * Formats a date into a human-readable month and year label.
 *
 * @param date The date to format.
 * @returns A string representing the month and year (e.g., "Feb 2026").
 */
function formatMonthLabel(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(date)
}

/**
 * Builds a list of month ranges for the last six months, including the current month.
 *
 * @remarks
 * Dates are calculated in local time and formatted as `YYYY-MM-DD`.
 * The returned array is ordered from oldest to newest month.
 *
 * @returns An array of `MonthRange` objects with `startDate`, `endDate`, and `label`.
 *
 * @example
 * const months = getLastSixMonths();
 * // months[0].label -> "Sep 2025"
 * // months[5].label -> "Feb 2026"
 */
export function getLastSixMonths(): MonthRange[] {
  const today = new Date()
  const startOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  startOfCurrentMonth.setHours(0, 0, 0, 0)

  const months: MonthRange[] = []

  for (let i = 5; i >= 0; i -= 1) {
    const monthStart = new Date(
      startOfCurrentMonth.getFullYear(),
      startOfCurrentMonth.getMonth() - i,
      1
    )

    const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0)

    months.push({
      startDate: formatLocalDate(monthStart),
      endDate: formatLocalDate(monthEnd),
      label: formatMonthLabel(monthStart),
    })
  }

  return months
}

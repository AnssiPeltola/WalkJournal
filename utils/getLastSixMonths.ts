import type { MonthRange } from '@/types/time'

// Build YYYY-MM-DD using local time to avoid UTC date shifts.
function formatLocalDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatMonthLabel(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(date)
}

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

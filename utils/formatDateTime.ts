/**
 * Formats a UTC date-time string to Helsinki local time in Finnish date and time format.
 *
 * @param dateTime A date-time string in UTC.
 * @returns A string representing the date and time in Helsinki local time, formatted according to Finnish conventions.
 */
export function formatDateTimeUTCToHelsinki(dateTime: string | null): string {
  if (!dateTime) return '-';

  // Parse the input date-time string as UTC and convert it to Helsinki local time.
  return new Date(dateTime.replace(' ', 'T') + 'Z').toLocaleString('fi-FI', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Helsinki',
  });
}

/**
 * Formats a date string to Finnish date format (DD.MM.YYYY).
 *
 * @remarks
 * If the input is already in `YYYY-MM-DD`, it is reformatted without parsing.
 * Otherwise, the value is parsed with `Date` as a fallback.
 *
 * @param date A date string, commonly in ISO format (`YYYY-MM-DD`).
 * @returns A Finnish-formatted date string, or `-` if the input is null or invalid.
 *
 * @example
 * formatDateToFinnish("2026-02-09");
 * // "09.02.2026"
 */
export function formatDateToFinnish(date: string | null): string {
  if (!date) return '-';

  // If the input already looks like YYYY-MM-DD, reformat directly.
  const parts = date.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    if (year && month && day) {
      return `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`;
    }
  }

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return '-';

  const day = String(parsed.getDate()).padStart(2, '0');
  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  const year = parsed.getFullYear();

  return `${day}.${month}.${year}`;
}

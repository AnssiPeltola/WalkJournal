/**
 * Returns the start and end dates of the last week.
 *
 * @returns An object containing the start and end dates of the last week in YYYY-MM-DD format.
 */

export function getLastWeekDates(): { startOfWeek: string; endOfWeek: string } {
  const today = new Date();
  const day = today.getDay(); // Sunday = 0, Monday = 1
  const diffToMonday = day === 0 ? 6 : day - 1;

  // Build YYYY-MM-DD using local time to avoid UTC date shifts.
  const formatLocalDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const dayOfMonth = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${dayOfMonth}`;
  };
  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - diffToMonday - 7);

  const lastSunday = new Date(lastMonday);
  lastSunday.setDate(lastMonday.getDate() + 6);

  const startOfWeek = formatLocalDate(lastMonday);
  const endOfWeek = formatLocalDate(lastSunday);

  return { startOfWeek, endOfWeek };
}

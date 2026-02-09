/**
 * Returns the start and end dates of the current week.
 *
 * @returns An object containing the start and end dates of the current week in YYYY-MM-DD format.
 */

export function getCurrentWeek(): { startOfWeek: string; endOfWeek: string } {
  const now = new Date();
  const day = now.getDay();

  // Build YYYY-MM-DD using local time to avoid UTC date shifts.
  const formatLocalDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const dayOfMonth = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${dayOfMonth}`;
  };

  // Calculate Monday of current week
  const diffToMonday = (day === 0 ? 6 : day - 1); // Sunday goes back 6 days
  const monday = new Date(now);
  monday.setDate(now.getDate() - diffToMonday);
  monday.setHours(0, 0, 0, 0);

  // Calculate Sunday of current week
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  // Return as YYYY-MM-DD strings for Drizzle query
  return {
    startOfWeek: formatLocalDate(monday),
    endOfWeek: formatLocalDate(sunday),
  };
}

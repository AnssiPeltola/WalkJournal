/**
 * Gets the start and end dates for the current week (Monday–Sunday) using local time.
 *
 * @remarks
 * Dates are formatted as `YYYY-MM-DD` and are intended for date-only filtering
 * (time-of-day is normalized internally).
 *
 * @returns An object with:
 * - `startOfWeek`: Monday of the current week, formatted as `YYYY-MM-DD`.
 * - `endOfWeek`: Sunday of the current week, formatted as `YYYY-MM-DD`.
 *
 * @example
 * const { startOfWeek, endOfWeek } = getCurrentWeek();
 * // startOfWeek -> "2026-02-09"
 * // endOfWeek   -> "2026-02-15"
 */

export function getCurrentWeek(): { startOfWeek: string; endOfWeek: string } {
  const now = new Date();
  // getDay() returns weekdays as 0 (Sunday) to 6 (Saturday)
  const day = now.getDay();

  // Build YYYY-MM-DD using local time to avoid UTC date shifts.
  // This ensures that the week boundaries are consistent with the user's local calendar
  const formatLocalDate = (date: Date): string => {
    const year = date.getFullYear();
    // padStart formmat month and day to ensure two digits (e.g. 2 -> 02)
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const dayOfMonth = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${dayOfMonth}`;
  };

  // Calculate Monday of current week
  // If today is Sunday (0), we want to go back 6 days to get Monday. Otherwise, we go back (day - 1) days.
  const diffToMonday = (day === 0 ? 6 : day - 1); // Sunday goes back 6 days
  const monday = new Date(now);
  monday.setDate(now.getDate() - diffToMonday);
  monday.setHours(0, 0, 0, 0);

  // Calculate Sunday of current week
  // Sunday is 6 days after Monday, and we set the time to the end of the day (23:59:59.999) to include all sessions on Sunday.
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  // Return the formatted start and end of the week as YYYY-MM-DD strings
  return {
    startOfWeek: formatLocalDate(monday),
    endOfWeek: formatLocalDate(sunday),
  };
}

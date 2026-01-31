export function getLastWeekDates(): { startOfWeek: string; endOfWeek: string } {
  const today = new Date();
  const day = today.getDay(); // Sunday = 0, Monday = 1
  const diffToMonday = day === 0 ? 6 : day - 1;
  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - diffToMonday - 7);

  const lastSunday = new Date(lastMonday);
  lastSunday.setDate(lastMonday.getDate() + 6);

  const startOfWeek = lastMonday.toISOString().split('T')[0];
  const endOfWeek = lastSunday.toISOString().split('T')[0];

  return { startOfWeek, endOfWeek };
}

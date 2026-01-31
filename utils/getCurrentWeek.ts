export function getCurrentWeek(): { startOfWeek: string; endOfWeek: string } {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, ...

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
    startOfWeek: monday.toISOString().split('T')[0],
    endOfWeek: sunday.toISOString().split('T')[0],
  };
}

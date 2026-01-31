export function formatDateTimeUTCToHelsinki(dateTime: string | null): string {
  if (!dateTime) return '-';

  return new Date(dateTime.replace(' ', 'T') + 'Z').toLocaleString('fi-FI', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Helsinki',
  });
}

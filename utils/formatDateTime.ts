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

export function formatDateToFinnish(date: string | null): string {
  if (!date) return '-';

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

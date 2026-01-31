export function formatDuration(totalSeconds: number): string {
  const totalMinutes = Math.floor(totalSeconds / 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours > 0) {
    return `${hours} h ${minutes} min`
  }

  return `${minutes} min`
}

export function diffTime(current: number, last?: number): string | undefined {
  if (last === undefined || last === null) return undefined;

  const difference = current - last;
  const sign = difference >= 0 ? '+' : '-';
  return sign + ' ' + formatDuration(Math.abs(difference));
}

export function formatDuration(totalSeconds: number): string {
  const totalMinutes = Math.floor(totalSeconds / 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours > 0) {
    return `${hours} h ${minutes} min`
  }

  return `${minutes} min`
}

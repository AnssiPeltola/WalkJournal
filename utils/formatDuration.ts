/**
 * Formats a duration given in total seconds into a human-readable string format.
 *
 * @param totalSeconds The total duration in seconds.
 * @returns A string representing the duration in hours and minutes.
 */
export function formatDuration(totalSeconds: number): string {
  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours} h ${minutes} min`;
  }

  return `${minutes} min`;
}

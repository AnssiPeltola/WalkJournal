import { WalkTotals } from '@/types/walk';
import { formatDuration, diffTime } from '@/utils/formatDuration';
import StatCardWithDiff from '../StatCardWithDiff';

type Props = {
  currentWeek: WalkTotals | null;
  lastWeek: WalkTotals | null;
};

export default function CurrentWeekStatsDashboard({ currentWeek, lastWeek }: Props) {
  if (!currentWeek || currentWeek.totalSessions === 0) {
    return (
      <p className="text-center text-gray-500">
        No walk sessions recorded this week.
      </p>
    );
  }

  const diff = (current: number, last?: number, decimals = 0) =>
  last !== undefined && last !== null
    ? Number((current - last).toFixed(decimals))
    : undefined;

  return (
    <section className="stats-grid">
      <StatCardWithDiff
        label="Total Sessions"
        value={currentWeek.totalSessions}
        diff={diff(currentWeek.totalSessions, lastWeek?.totalSessions)}
      />
      <StatCardWithDiff
        label="Total Distance"
        value={`${currentWeek.totalDistanceKm} km`}
        diff={diff(currentWeek.totalDistanceKm, lastWeek?.totalDistanceKm, 2)}
      />
      <StatCardWithDiff
        label="Total Steps"
        value={currentWeek.totalSteps}
        diff={diff(currentWeek.totalSteps, lastWeek?.totalSteps)}
      />
      <StatCardWithDiff
        label="Total Time"
        value={formatDuration(currentWeek.totalDurationSec)}
        diff={diffTime(currentWeek.totalDurationSec, lastWeek?.totalDurationSec)}
      />
      <StatCardWithDiff
        label="Total Calories"
        value={currentWeek.totalCalories ?? '-'}
        diff={diff(currentWeek.totalCalories ?? 0, lastWeek?.totalCalories)}
      />
    </section>
  );
}

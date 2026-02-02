import { WalkTotalsCurrentWeek } from '@/types/walk';
import { formatDuration, diffTime } from '@/utils/formatDuration';
import StatCardWithDiff from '../StatCardWithDiff';

type Props = {
  currentWeek: WalkTotalsCurrentWeek | null;
  lastWeek: WalkTotalsCurrentWeek | null;
};

export default function CurrentWeekStatsDashboard({ currentWeek, lastWeek }: Props) {
  const emptyTotals: WalkTotalsCurrentWeek = {
    totalSessions: 0,
    totalDurationSec: 0,
    totalDistanceKm: 0,
    totalSteps: 0,
    totalCalories: 0,
  };

  const current = currentWeek ?? emptyTotals;

  const diff = (value: number, last?: number, decimals = 0) =>
    last !== undefined && last !== null
      ? Number((value - last).toFixed(decimals))
      : undefined;

  return (
    <section className="stats-grid">
      <StatCardWithDiff
        label="Total Sessions"
        value={current.totalSessions}
        diff={diff(current.totalSessions, lastWeek?.totalSessions)}
      />
      <StatCardWithDiff
        label="Total Distance"
        value={`${current.totalDistanceKm} km`}
        diff={diff(current.totalDistanceKm, lastWeek?.totalDistanceKm, 2)}
      />
      <StatCardWithDiff
        label="Total Steps"
        value={current.totalSteps}
        diff={diff(current.totalSteps, lastWeek?.totalSteps)}
      />
      <StatCardWithDiff
        label="Total Time"
        value={formatDuration(current.totalDurationSec)}
        diff={diffTime(current.totalDurationSec, lastWeek?.totalDurationSec)}
      />
      <StatCardWithDiff
        label="Total Calories"
        value={current.totalCalories}
        diff={diff(current.totalCalories, lastWeek?.totalCalories)}
      />
    </section>
  );
}

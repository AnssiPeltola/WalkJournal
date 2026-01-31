import { WalkTotals } from '@/types/walk';
import { formatDuration } from '@/utils/formatDuration';
import StatCard from '@/components/stats/StatCard';

type Props = {
  stats: WalkTotals | null;
};

export default function CurrentWeekStatsDashboard({ stats }: Props) {
  // If no sessions in current week
  if (!stats || stats.totalSessions === 0) {
    return (
      <p className="text-center text-gray-500">
        No walk sessions recorded this week.
      </p>
    );
  }

  return (
    <section className="stats-grid">
      <StatCard label="Total Sessions" value={stats.totalSessions} />
      <StatCard label="Total Distance" value={`${stats.totalDistanceKm} km`} />
      <StatCard label="Total Steps" value={stats.totalSteps} />
      <StatCard label="Total Time" value={formatDuration(stats.totalDurationSec)} />
      <StatCard label="Total Calories" value={stats.totalCalories ?? '-'} />
    </section>
  );
}

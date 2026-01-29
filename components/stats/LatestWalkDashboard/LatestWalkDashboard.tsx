import { WalkSession } from '@/types/walk';
import { formatDuration } from '@/utils/formatDuration';
import StatCard from '@/components/stats/StatCard';

type Props = {
  session: WalkSession | null;
};

export default function LatestWalkDashboard({ session }: Props) {

  // If no sessions in database return this
  if (!session) return <p>No walk sessions yet.</p>;

  const formattedDate = new Date(session.date).toLocaleDateString('fi-FI', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <section className="stats-grid max-w-md mx-auto">
      <StatCard label="Date" value={formattedDate} />
      <StatCard label="Duration" value={formatDuration(session.durationSec)} />
      <StatCard label="Distance" value={`${session.distanceKm} km`} />
      <StatCard label="Steps" value={session.steps} />
      <StatCard label="Calories" value={session.calories ?? '-'} />
      <StatCard label="Avg Speed" value={`${session.avgSpeed.toFixed(2)} km/h`} />
    </section>
  );
}

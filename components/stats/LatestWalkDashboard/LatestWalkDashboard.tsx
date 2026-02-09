import { WalkSession } from '@/types/walk';
import { formatDuration } from '@/utils/formatDuration';
import StatCard from '@/components/stats/StatCard';
import { formatDateToFinnish } from '@/utils/formatDateTime';

type Props = {
  session: WalkSession | null;
};

export default function LatestWalkDashboard({ session }: Props) {

  // If no sessions in database return this
  if (!session) return <p>No walk sessions yet.</p>;

  return (
    <section className="grid w-full grid-cols-1 gap-x-3 gap-y-3 sm:w-fit sm:grid-cols-[repeat(3,12rem)]">
      <StatCard label="Date" value={formatDateToFinnish(session.date)} />
      <StatCard label="Distance" value={`${session.distanceKm} km`} />
      <StatCard label="Steps" value={session.steps} />
      <StatCard label="Duration" value={formatDuration(session.durationSec)} />
      <StatCard label="Avg Speed" value={`${session.avgSpeed.toFixed(2)} km/h`} />
      <StatCard label="Calories" value={session.calories ?? '-'} />
    </section>
  );
}

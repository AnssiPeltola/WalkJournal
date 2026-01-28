import { WalkTotals } from '@/types/walk'
import { formatDuration } from '@/utils/formatDuration'
import StatCard from './StatCard'

type Props = {
  stats: WalkTotals
}

export default function TotalStatsDashboard({ stats }: Props) {
  return (
    <section className="stats-grid">
      <StatCard label="Total Sessions" value={stats.totalSessions} />
      <StatCard label="Total Distance" value={`${stats.totalDistanceKm} km`} />
      <StatCard label="Total Time" value={formatDuration(stats.totalDurationSec)} />
      <StatCard label="Calories Burned" value={`${stats.totalCalories} kcal`} />
    </section>
  )
}

import { WalkTotals } from '@/types/walk'
import { formatDuration } from '@/utils/formatDuration'
import StatCard from '../StatCard'

type Props = {
  stats: WalkTotals
}

export default function TotalStatsDashboard({ stats }: Props) {
  return (
    <section className="flex flex-wrap justify-center gap-2">
      <StatCard label="Total Sessions" value={stats.totalSessions} />
      <StatCard label="Total Distance" value={`${stats.totalDistanceKm} km`} />
      <StatCard label="Total Steps" value={stats.totalSteps} />
      <StatCard label="Total Time" value={formatDuration(stats.totalDurationSec)} />
      <StatCard label="Calories Burned" value={`${stats.totalCalories} kcal`} />
    </section>
  )
}

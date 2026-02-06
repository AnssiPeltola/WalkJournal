import ProgressCard from './ProgressCard'
import JourneyTimeline from './JourneyTimeline'
import { JourneyProgress } from '@/types/goals'

type JourneyDashboardProps = {
  progress: JourneyProgress | null
  isLoading?: boolean
}

export default function JourneyDashboard({ progress, isLoading = false }: JourneyDashboardProps) {
  return (
    <section className="w-full max-w-5xl mx-auto grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <ProgressCard progress={progress} isLoading={isLoading} />
      <JourneyTimeline legs={progress?.legs ?? []} isLoading={isLoading} />
    </section>
  )
}

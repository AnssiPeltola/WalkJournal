import ProgressCard from './ProgressCard'
import JourneyTimeline from './JourneyTimeline'
import { JourneyProgress } from '@/types/goals'

type JourneyDashboardProps = {
  progress: JourneyProgress | null
  isLoading?: boolean
}

export default function JourneyDashboard({ progress, isLoading = false }: JourneyDashboardProps) {
  return (
    <section className="w-full grid gap-6">
      <ProgressCard progress={progress} isLoading={isLoading} />
      <JourneyTimeline legs={progress?.legs ?? []} isLoading={isLoading} />
    </section>
  )
}

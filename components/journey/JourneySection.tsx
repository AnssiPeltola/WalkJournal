'use client'

import { useMemo, useState } from 'react'
import JourneyDashboard from './JourneyDashboard'
import JourneyMap from './JourneyMap'
import { JourneyLegProgress, JourneyProgress } from '@/types/goals'

type JourneySectionProps = {
  progress: JourneyProgress | null
}

export default function JourneySection({ progress }: JourneySectionProps) {
  const legs = useMemo(() => progress?.legs ?? [], [progress?.legs])
  const [selectedLegId, setSelectedLegId] = useState<number | null>(null)

  const selectedLeg = useMemo<JourneyLegProgress | null>(() => {
    if (selectedLegId === null) return null
    return legs.find((leg) => leg.goal.id === selectedLegId) ?? null
  }, [legs, selectedLegId])

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <JourneyDashboard
        progress={progress}
        selectedLegId={selectedLegId}
        onSelectLegId={setSelectedLegId}
      />
      <JourneyMap progress={progress} selectedLeg={selectedLeg} />
    </div>
  )
}

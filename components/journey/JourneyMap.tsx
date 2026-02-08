 'use client'

import { JourneyLegProgress, JourneyProgress } from '@/types/goals'
import dynamic from 'next/dynamic'

const JourneyMapClient = dynamic(() => import('./JourneyMapClient'), {
  ssr: false,
})

type JourneyMapProps = {
  progress: JourneyProgress | null
  selectedLeg?: JourneyLegProgress | null
}

export default function JourneyMap({ progress, selectedLeg = null }: JourneyMapProps) {
  return <JourneyMapClient progress={progress} selectedLeg={selectedLeg} />
}

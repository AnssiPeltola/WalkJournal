'use client'

import { JourneyProgress } from '@/types/goals'
import JourneyMapClient from './JourneyMapClient'

type JourneyMapProps = {
  progress: JourneyProgress | null
}

export default function JourneyMap({ progress }: JourneyMapProps) {
  return <JourneyMapClient progress={progress} />
}

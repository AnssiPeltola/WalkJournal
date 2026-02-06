 'use client'

import { JourneyProgress } from '@/types/goals'
import dynamic from 'next/dynamic'

const JourneyMapClient = dynamic(() => import('./JourneyMapClient'), {
  ssr: false,
})

type JourneyMapProps = {
  progress: JourneyProgress | null
}

export default function JourneyMap({ progress }: JourneyMapProps) {
  return <JourneyMapClient progress={progress} />
}

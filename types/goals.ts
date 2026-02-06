export type Goal = {
  id: number
  orderIndex: number
  name: string
  startCity: string
  endCity: string
  startLat: number
  startLng: number
  endLat: number
  endLng: number
  segmentKm: number
}

export type JourneyLegStatus = 'completed' | 'current' | 'upcoming'

export type JourneyLegProgress = {
  goal: Goal
  status: JourneyLegStatus
  completedKm: number
  remainingKm: number
  progressPercent: number
}

export type JourneyProgress = {
  totalKm: number
  currentLeg: JourneyLegProgress | null
  progressPercent: number
  remainingKm: number
  legs: JourneyLegProgress[]
}

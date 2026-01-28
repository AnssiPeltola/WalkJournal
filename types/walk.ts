export type NewWalkSession = {
  date: string
  durationSec: number
  distanceKm: number
  steps: number
  calories?: number
}

export type WalkStats = {
  totalSessions: number
  totalDurationSec: number
  totalDistanceKm: number
  totalSteps: number
  totalCalories: number
}
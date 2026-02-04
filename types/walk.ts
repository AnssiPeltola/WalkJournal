export type NewWalkSession = {
  date: string
  durationSec: number
  distanceKm: number
  steps: number
  calories?: number
}

export type WalkTotals = {
  totalSessions: number
  totalDurationSec: number
  totalDistanceKm: number
  totalSteps: number
  totalCalories: number
}

export type WalkDailyTotal = {
  date: string
  totalDistanceKm: number
}

export type DistanceTrendPoint = {
  label: string
  totalKm: number
}

export type WalkSession = {
  id: number;
  date: string;
  durationSec: number;
  distanceKm: number;
  steps: number;
  avgSpeed: number;
  calories?: number | null;
  createdAt: string | null;
}

export type WalkTotalsCurrentWeek = {
  totalSessions: number
  totalDurationSec: number
  totalDistanceKm: number
  totalSteps: number
  totalCalories: number
}

export type WalkTotalsLastWeek = {
  totalSessions: number;
  totalDurationSec: number;
  totalDistanceKm: number;
  totalSteps: number;
  totalCalories: number;
};
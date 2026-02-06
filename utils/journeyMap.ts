import { JourneyLegProgress } from '@/types/goals'

type LatLng = {
  lat: number
  lng: number
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

// Interpolate between start and end coordinates based on progress percentage.
export function computeCurrentPosition(
  currentLeg: JourneyLegProgress | null,
  progressPercent: number
): LatLng | null {
  if (!currentLeg) {
    return null
  }

  const t = clamp(progressPercent, 0, 100) / 100
  const startLat = currentLeg.goal.startLat
  const startLng = currentLeg.goal.startLng
  const endLat = currentLeg.goal.endLat
  const endLng = currentLeg.goal.endLng

  return {
    lat: startLat + (endLat - startLat) * t,
    lng: startLng + (endLng - startLng) * t,
  }
}

import { Goal, JourneyLegProgress, JourneyLegStatus, JourneyProgress } from '@/types/goals'

type DistanceSession = {
  distanceKm: number
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function computeTotalWalkedKm(sessions: DistanceSession[]): number {
  return sessions.reduce((total, session) => {
    const distance = Number.isFinite(session.distanceKm) ? session.distanceKm : 0
    return total + distance
  }, 0)
}

// Pure calculation for journey progress based on walked distance.
export function computeJourneyProgress(goals: Goal[], totalKm: number): JourneyProgress {
  const orderedGoals = [...goals].sort((a, b) => a.orderIndex - b.orderIndex)
  const safeTotalKm = Math.max(0, Number.isFinite(totalKm) ? totalKm : 0)

  let remainingDistance = safeTotalKm
  let hasCurrentLeg = false

  const legs = orderedGoals.map((goal) => {
    const segmentKm = Math.max(0, goal.segmentKm)
    let status: JourneyLegStatus = 'upcoming'
    let completedKm = 0
    let remainingKm = segmentKm
    let progressPercent = 0

    if (hasCurrentLeg) {
      status = 'upcoming'
    } else if (remainingDistance >= segmentKm && segmentKm > 0) {
      status = 'completed'
      completedKm = segmentKm
      remainingKm = 0
      progressPercent = 100
      remainingDistance -= segmentKm
    } else {
      status = 'current'
      completedKm = Math.min(remainingDistance, segmentKm)
      remainingKm = Math.max(0, segmentKm - completedKm)
      progressPercent = segmentKm > 0 ? clamp((completedKm / segmentKm) * 100, 0, 100) : 100
      remainingDistance = 0
      hasCurrentLeg = true
    }

    const legProgress: JourneyLegProgress = {
      goal,
      status,
      completedKm,
      remainingKm,
      progressPercent,
    }

    return legProgress
  })

  const currentLeg = legs.find((leg) => leg.status === 'current') ?? null
  const finishedAll = legs.length > 0 && legs.every((leg) => leg.status === 'completed')
  const progressPercent = currentLeg ? currentLeg.progressPercent : finishedAll ? 100 : 0
  const remainingKm = currentLeg ? currentLeg.remainingKm : 0

  return {
    totalKm: safeTotalKm,
    currentLeg,
    progressPercent,
    remainingKm,
    legs,
  }
}

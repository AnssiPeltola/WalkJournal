'use server'

import { createWalkSession, getAllGoalsOrdered, getAllWalkSessions } from '@/db/queries'
import { JourneyProgress, Goal } from '@/types/goals'
import { NewWalkSession } from '@/types/walk'
import { computeJourneyProgress, computeTotalWalkedKm } from '@/utils/journeyProgress'
import { refresh } from 'next/cache'

export async function addWalkSessionAction(data: NewWalkSession) {
  await createWalkSession(data)
  refresh()
}

function createEmptyJourneyProgress(totalKm: number): JourneyProgress {
  return {
    totalKm,
    currentLeg: null,
    progressPercent: 0,
    remainingKm: 0,
    legs: [],
  }
}

// Server action that returns UI-friendly journey progress data.
export async function getJourneyProgressAction(): Promise<JourneyProgress> {
  try {
    const [sessions, goalRows] = await Promise.all([
      getAllWalkSessions(),
      getAllGoalsOrdered(),
    ])

    const totalKm = computeTotalWalkedKm(
      sessions.map((session) => ({ distanceKm: session.distanceKm }))
    )

    if (goalRows.length === 0) {
      return createEmptyJourneyProgress(totalKm)
    }

    const goals: Goal[] = goalRows.map((row) => ({
      id: row.id,
      orderIndex: row.orderIndex,
      name: row.name,
      startCity: row.startCity,
      endCity: row.endCity,
      startLat: row.startLat,
      startLng: row.startLng,
      endLat: row.endLat,
      endLng: row.endLng,
      segmentKm: row.segmentKm,
    }))

    return computeJourneyProgress(goals, totalKm)
  } catch (err) {
    console.error('Failed to build journey progress:', err)
    return createEmptyJourneyProgress(0)
  }
}

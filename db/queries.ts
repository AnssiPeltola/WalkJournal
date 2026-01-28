import { sql } from 'drizzle-orm'
import { db } from './client'
import { walkSessions } from './schema'
import { NewWalkSession, WalkTotals } from '@/types/walk'

// Fetch all walking sessions from database
export async function getAllWalkSessions() {
  try {
    return await db.select().from(walkSessions)
  } catch (err) {
    console.error('Failed to fetch walk sessions:', err)
    return []
  }
}

export async function createWalkSession(data: NewWalkSession) {
  const {date, durationSec, distanceKm, steps, calories} = data

  // Validations so user cannot insert empty or nonsense values
  if (!date) {
    throw new Error('Date is required')
  }

  if (durationSec <= 0) {
    throw new Error('Duration must be greater than 0')
  }

  if (distanceKm <= 0) {
    throw new Error('Distance must be greater than 0')
  }

  if (steps < 0) {
    throw new Error('Steps cannot be negative')
  }

  if (calories !== undefined && calories < 0) {
    throw new Error('Calories cannot be negative')
  }

  // Calculate avgSpeed
  const avgSpeed = distanceKm / (durationSec / 3600)

  // Inserts values to walkSessions database using Drizzle
  try {
    await db.insert(walkSessions).values({
      date,
      durationSec,
      distanceKm,
      steps,
      calories,
      avgSpeed,
    }) // consider .returning here later
  } catch (err) {
    console.error('Failed to insert walk session' , err)
    throw err
  }
}

export async function getWalkStats(): Promise<WalkTotals> {
  try {
    const result = await db
      .select({
        totalSessions: sql<number>`count(*)`,
        totalDurationSec: sql<number>`coalesce(sum(${walkSessions.durationSec}), 0)`,
        totalDistanceKm: sql<number>`coalesce(sum(${walkSessions.distanceKm}), 0)`,
        totalSteps: sql<number>`coalesce(sum(${walkSessions.steps}), 0)`,
        totalCalories: sql<number>`coalesce(sum(${walkSessions.calories}), 0)`,
      })
      .from(walkSessions)

    return result[0]
  } catch (err) {
    console.error('Failed to fetch walk stats:', err)
    throw err
  }
}
import { sql, desc } from 'drizzle-orm'
import { db } from './client'
import { walkSessions } from './schema'
import { NewWalkSession, WalkTotals, WalkSession, WalkTotalsCurrentWeek} from '@/types/walk'
import { getCurrentWeek } from '@/utils/getCurrentWeek'

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

// Fetch all walking sessions summed together
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

export async function getLatestWalkSession(): Promise<WalkSession | null> {
  try {
    const result = await db
      .select()
      .from(walkSessions)
      .orderBy(desc(walkSessions.id))
      .limit(1);

    return result[0] ?? null;
  } catch (err) {
    console.error('Failed to fetch latest walk session:', err);
    return null;
  }
}

export async function getWalkStatsCurrentWeek(): Promise<WalkTotalsCurrentWeek> {
  const { startOfWeek, endOfWeek } = getCurrentWeek();

  const result = await db
    .select({
      totalSessions: sql<number>`count(*)`,
      totalDurationSec: sql<number>`coalesce(sum(${walkSessions.durationSec}), 0)`,
      totalDistanceKm: sql<number>`coalesce(sum(${walkSessions.distanceKm}), 0)`,
      totalSteps: sql<number>`coalesce(sum(${walkSessions.steps}), 0)`,
      totalCalories: sql<number>`coalesce(sum(${walkSessions.calories}), 0)`,
    })
    .from(walkSessions)
    .where(sql`${walkSessions.date} >= ${startOfWeek} AND ${walkSessions.date} <= ${endOfWeek}`);

  return result[0];
}
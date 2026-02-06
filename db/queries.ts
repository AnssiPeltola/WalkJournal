import { sql, desc } from 'drizzle-orm'
import { db } from './client'
import { goals, walkSessions } from './schema'
import { DistanceTrendPoint, NewWalkSession, WalkDailyTotal, WalkTotals, WalkSession, WalkTotalsCurrentWeek, WalkTotalsLastWeek } from '@/types/walk'
import { getCurrentWeek } from '@/utils/getCurrentWeek'
import { getLastWeekDates } from '@/utils/getLastWeek'
import { getLastSixWeeks } from '@/utils/getLastSixWeeks'
import { getLastSixMonths } from '@/utils/getLastSixMonths'

// Fetch all walking sessions from database
export async function getAllWalkSessions() {
  try {
    return await db.select().from(walkSessions)
  } catch (err) {
    console.error('Failed to fetch walk sessions:', err)
    return []
  }
}

// Fetch all goals ordered by route sequence
export async function getAllGoalsOrdered() {
  try {
    return await db.select().from(goals).orderBy(goals.orderIndex)
  } catch (err) {
    console.error('Failed to fetch goals:', err)
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

export async function getWalkStatsLastWeek(): Promise<WalkTotalsLastWeek> {
  const { startOfWeek, endOfWeek } = getLastWeekDates();

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

export async function getWalkDailyTotals(
  startDate: string,
  endDate: string
): Promise<WalkDailyTotal[]> {
  try {
    return await db
      .select({
        date: walkSessions.date,
        totalDistanceKm: sql<number>`coalesce(sum(${walkSessions.distanceKm}), 0)`,
      })
      .from(walkSessions)
      .where(sql`${walkSessions.date} >= ${startDate} AND ${walkSessions.date} <= ${endDate}`)
      .groupBy(walkSessions.date)
      .orderBy(walkSessions.date)
  } catch (err) {
    console.error('Failed to fetch daily walk totals:', err)
    return []
  }
}

export async function getWeeklyDistanceTotals(): Promise<DistanceTrendPoint[]> {
  const weeks = getLastSixWeeks()

  const results = await Promise.all(
    weeks.map(async (week) => {
      const total = await db
        .select({
          totalKm: sql<number>`coalesce(sum(${walkSessions.distanceKm}), 0)`,
        })
        .from(walkSessions)
        .where(sql`${walkSessions.date} >= ${week.startDate} AND ${walkSessions.date} <= ${week.endDate}`)

      return {
        label: week.label,
        totalKm: total[0]?.totalKm ?? 0,
      }
    })
  )

  return results
}

export async function getMonthlyDistanceTotals(): Promise<DistanceTrendPoint[]> {
  const months = getLastSixMonths()

  const results = await Promise.all(
    months.map(async (month) => {
      const total = await db
        .select({
          totalKm: sql<number>`coalesce(sum(${walkSessions.distanceKm}), 0)`,
        })
        .from(walkSessions)
        .where(sql`${walkSessions.date} >= ${month.startDate} AND ${walkSessions.date} <= ${month.endDate}`)

      return {
        label: month.label,
        totalKm: total[0]?.totalKm ?? 0,
      }
    })
  )

  return results
}
import { db } from './client'
import { walkSessions } from './schema'

// Fetch all walking sessions from database
export async function getAllWalkSessions() {
  try {
    return await db.select().from(walkSessions)
  } catch (err) {
    console.error('Failed to fetch walk sessions:', err)
    return []
  }
}

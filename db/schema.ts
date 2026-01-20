import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

// This file tells Drizzle how tables are made so we can make type-safe queries

// DB setup (run only for fresh databases):
// npx drizzle-kit generate
// npx drizzle-kit migrate

export const walkSessions = sqliteTable('walk_sessions', {
  id: integer('id').primaryKey(),
  date: text('date').notNull(),
  durationSec: integer('duration_sec').notNull(),
  distanceKm: real('distance_km').notNull(),
  steps: integer('steps').notNull(),
  avgSpeed: real('avg_speed').notNull(),
  calories: integer('calories'),
  createdAt: text('created_at').default(sql`datetime('now')`),
})

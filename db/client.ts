import { Database } from '@sqlitecloud/drivers'
import { drizzle } from 'drizzle-orm/sqlite-cloud'

// Creates a SQLite Cloud connection and wraps it with Drizzle ORM,
// exporting a type-safe `db` instance for querying the database in Next.js

// The ! at the end tells TypeScript that this value will never be null or undefined
const connectionString = process.env.SQLITE_CLOUD_CONNECTION_STRING!
const client = new Database(connectionString)
export const db = drizzle({ client })

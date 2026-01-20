import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

// Drizzle Kit configuration file:
// - Tells Drizzle where to find the schema (`schema.ts`) and where to store migrations (`./drizzle`)
// - Specifies the database dialect (SQLite) and connection URL from environment variables
// - Used when running `npx drizzle-kit generate` or `npx drizzle-kit migrate`

export default defineConfig({
  out: './drizzle', // where migrations will be stored
  schema: './db/schema.ts', // where our schema will go
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.SQLITE_CLOUD_CONNECTION_STRING!,
  },
})

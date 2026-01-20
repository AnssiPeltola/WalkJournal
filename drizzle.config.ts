import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle', // where migrations will be stored
  schema: './src/db/schema.ts', // where our schema will go
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.SQLITE_CLOUD_CONNECTION_STRING!,
  },
})

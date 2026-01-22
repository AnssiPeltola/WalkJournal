'use server'

import { createWalkSession } from '@/db/queries'
import { NewWalkSession } from '@/types/walk'

export async function addWalkSessionAction(data: NewWalkSession) {
  await createWalkSession(data)
}

'use server'

import { createWalkSession } from '@/db/queries'
import { NewWalkSession } from '@/types/walk'
import { refresh } from 'next/cache'

export async function addWalkSessionAction(data: NewWalkSession) {
  await createWalkSession(data)
  refresh()
}

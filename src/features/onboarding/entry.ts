import type { RunView } from '@/features/onboarding/api.ts'
import { authApi } from '@/shared/lib/api.ts'

export type MeResponse = {
  user: { id: string; displayName: string | null; providers: string[] }
  onboarding: {
    mailboxCount: number
    primaryEmail: string | null
    latestRun: RunView | null
  }
}

export function getMe() {
  return authApi<MeResponse>('/me')
}

type Entry = { path: string; state?: unknown }

export function resolveEntry({ onboarding }: MeResponse): Entry {
  const { mailboxCount, primaryEmail, latestRun } = onboarding
  if (mailboxCount === 0 || !latestRun) return { path: '/onboarding/mail' }

  const state = { email: latestRun.email, runId: latestRun.id }
  if (latestRun.status === 'completed') {
    return { path: '/', state: { email: primaryEmail } }
  }
  return { path: '/onboarding/searching', state }
}

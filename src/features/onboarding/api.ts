import { authApi } from '@/shared/lib/api.ts'

export const CONSENT_VERSION = '2026-10-16'

export type ProviderView = {
  providerId: string
  name: string
  imapHost: string | null
  imapPort: number
  supported: boolean
  blockedReason: string | null
  manualServer: boolean
  guide: { text: string; url: string | null }[]
  passwordLabel: string
}

export type MailboxView = {
  id: string
  email: string
  providerId: string
  status: 'connected' | 'auth_failed' | 'imap_disabled' | 'unreachable'
  isPrimary: boolean
  lastAnalyzedAt: string | null
}

export type RunView = {
  id: string
  status:
    'queued' | 'fetching' | 'analyzing' | 'saving' | 'completed' | 'failed'
  processed: number
  total: number
  percent: number
  step: string | null
  email: string
  foundAccountCount: number | null
  failure: { code: string; retryable: boolean; message: string } | null
}

export type MailboxWithRun = {
  mailbox: MailboxView
  run: RunView
}

export type ConnectMailboxBody = {
  email: string
  password: string
  imapHost?: string
  imapPort?: number
}

export function detectMailProvider(email: string) {
  return authApi<ProviderView>(
    `/mail-providers/detect?${new URLSearchParams({ email })}`,
  )
}

export function listMailboxes() {
  return authApi<{ mailboxes: MailboxView[] }>('/mailboxes')
}

export function connectMailbox(body: ConnectMailboxBody) {
  return authApi<MailboxWithRun>('/mailboxes', {
    method: 'POST',
    body: JSON.stringify({ ...body, consentVersion: CONSENT_VERSION }),
  })
}

export function updateMailboxCredentials(
  mailboxId: string,
  body: Omit<ConnectMailboxBody, 'email'>,
) {
  return authApi<MailboxWithRun>(`/mailboxes/${mailboxId}/credentials`, {
    method: 'PUT',
    body: JSON.stringify(body),
  })
}

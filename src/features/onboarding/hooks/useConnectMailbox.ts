import { useMutation } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router'
import {
  connectMailbox,
  type ConnectMailboxBody,
} from '@/features/onboarding/api.ts'
import { ApiError } from '@/shared/lib/api.ts'

export type ConnectErrorState = {
  message: string
  hints: string[]
  provider: string | null
  retryPath: string
}

// IMAP 연결 실패는 O2c 화면으로, 나머지 오류는 폼에서 문구만 보여준다
const IMAP_ERROR_CODES = new Set([
  'IMAP_AUTH_FAILED',
  'IMAP_DISABLED',
  'IMAP_UNREACHABLE',
  'IMAP_TIMEOUT',
  'IMAP_TLS_FAILED',
  'MAIL_HOST_FORBIDDEN',
  'INTERNAL',
])

export function useConnectMailbox() {
  const navigate = useNavigate()
  const location = useLocation()

  const mutation = useMutation({
    mutationFn: connectMailbox,
    onSuccess: ({ mailbox, run }) => {
      navigate('/onboarding/searching', {
        state: { email: mailbox.email, mailboxId: mailbox.id, runId: run.id },
      })
    },
    onError: (error) => {
      if (!(error instanceof ApiError)) return
      if (error.status === 401) {
        navigate('/onboarding', { replace: true })
        return
      }
      if (error.status === 422 && IMAP_ERROR_CODES.has(error.code)) {
        const state: ConnectErrorState = {
          message: error.message,
          hints: error.detail.hints ?? [],
          provider: error.detail.provider ?? null,
          retryPath: location.pathname,
        }
        navigate('/onboarding/mail/error', { state })
      }
    },
  })

  const errorMessage =
    mutation.error instanceof ApiError
      ? mutation.error.message
      : mutation.error
        ? '잠시 후 다시 시도해주세요.'
        : null

  return {
    connect: (body: ConnectMailboxBody) => mutation.mutate(body),
    isPending: mutation.isPending,
    errorMessage,
  }
}

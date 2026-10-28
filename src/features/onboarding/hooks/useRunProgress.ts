import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getRun, resumeRun, type RunView } from '@/features/onboarding/api.ts'
import { getMe } from '@/features/onboarding/entry.ts'
import { ApiError } from '@/shared/lib/api.ts'

const isFinished = (run?: RunView) =>
  run?.status === 'completed' || run?.status === 'failed'

export function useRunProgress(initialRunId?: string) {
  const queryClient = useQueryClient()

  const me = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: !initialRunId,
  })
  const runId = initialRunId ?? me.data?.onboarding.latestRun?.id

  const run = useQuery({
    queryKey: ['run', runId],
    queryFn: () => getRun(runId!),
    enabled: !!runId,
    refetchInterval: (query) => (isFinished(query.state.data) ? false : 2000),
  })

  const resume = useMutation({
    mutationFn: () => resumeRun(runId!),
    onSuccess: (data) => queryClient.setQueryData(['run', runId], data),
  })

  const error = run.error ?? me.error ?? resume.error
  return {
    run: run.data,
    resume: () => resume.mutate(),
    isResuming: resume.isPending,
    resumeErrorMessage:
      resume.error instanceof ApiError ? resume.error.message : null,
    isUnauthorized: error instanceof ApiError && error.status === 401,
    isNotFound:
      (run.error instanceof ApiError && run.error.status === 404) ||
      (me.isSuccess && !runId),
  }
}

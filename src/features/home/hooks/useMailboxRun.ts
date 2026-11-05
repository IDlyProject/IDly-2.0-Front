import { useQuery } from '@tanstack/react-query'
import { getRun, type RunView } from '@/features/onboarding/api.ts'

const isFinished = (run?: RunView) =>
  run?.status === 'completed' || run?.status === 'failed'

export function useMailboxRun(runId?: string) {
  const { data } = useQuery({
    queryKey: ['run', runId],
    queryFn: () => getRun(runId!),
    enabled: !!runId,
    refetchInterval: (query) => (isFinished(query.state.data) ? false : 2000),
  })
  return data
}

export { isFinished as isRunFinished }

import { useNavigate } from 'react-router'
import { getMe, resolveEntry } from '@/features/onboarding/entry.ts'

export function useEntryRedirect() {
  const navigate = useNavigate()

  return async () => {
    const { path, state } = resolveEntry(await getMe())
    navigate(path, { replace: true, state })
  }
}

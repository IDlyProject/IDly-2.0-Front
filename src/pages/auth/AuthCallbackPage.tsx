import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { exchangeCode, takeCodeVerifier } from '@/features/auth/api.ts'
import { useEntryRedirect } from '@/features/onboarding/hooks/useEntryRedirect.ts'
import { saveTokens } from '@/shared/lib/authToken.ts'

function AuthCallbackPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const started = useRef(false)
  const redirect = useEntryRedirect()

  useEffect(() => {
    // 로그인 코드는 한 번만 쓸 수 있어서 StrictMode 재실행을 막는다
    if (started.current) return
    started.current = true

    const code = searchParams.get('code')
    const verifier = takeCodeVerifier()
    const fail = () =>
      navigate('/onboarding', { replace: true, state: { loginFailed: true } })

    if (!code || !verifier) {
      fail()
      return
    }

    exchangeCode(code, verifier)
      .then(async (tokens) => {
        saveTokens(tokens)
        await redirect().catch(() =>
          navigate('/onboarding/mail', { replace: true }),
        )
      })
      .catch(fail)
  }, [searchParams, navigate, redirect])

  return null
}

export default AuthCallbackPage

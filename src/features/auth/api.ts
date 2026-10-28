import { api, type TokenResponse } from '@/shared/lib/api.ts'
import { clearTokens, getRefreshToken } from '@/shared/lib/authToken.ts'
import { createChallenge, createCodeVerifier } from './pkce.ts'

export type SocialProvider = 'google' | 'apple' | 'kakao'

const VERIFIER_KEY = 'idly_code_verifier'

export async function startSocialLogin(provider: SocialProvider) {
  const verifier = createCodeVerifier()
  const challenge = await createChallenge(verifier)
  sessionStorage.setItem(VERIFIER_KEY, verifier)

  const params = new URLSearchParams({ client_challenge: challenge })
  window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/${provider}/start?${params}`
}

export function takeCodeVerifier() {
  const verifier = sessionStorage.getItem(VERIFIER_KEY)
  sessionStorage.removeItem(VERIFIER_KEY)
  return verifier
}

export function exchangeCode(code: string, codeVerifier: string) {
  return api<TokenResponse>('/auth/exchange', {
    method: 'POST',
    body: JSON.stringify({ code, codeVerifier }),
  })
}

export async function logout() {
  const refreshToken = getRefreshToken()
  clearTokens()
  if (refreshToken) {
    await api<void>('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    }).catch(() => {})
  }
}

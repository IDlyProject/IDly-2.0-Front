import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  saveTokens,
} from '@/shared/lib/authToken.ts'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export type ErrorDetail = {
  code: string
  message: string
  fields?: string[] | null
  provider?: string | null
  hints?: string[] | null
  retryable?: boolean | null
}

export class ApiError extends Error {
  status: number
  detail: ErrorDetail

  constructor(status: number, detail: ErrorDetail) {
    super(detail.message)
    this.status = status
    this.detail = detail
  }

  get code() {
    return this.detail.code
  }
}

export type UserView = {
  id: string
  displayName: string | null
}

export type TokenResponse = {
  accessToken: string
  refreshToken: string
  user: UserView
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  })
  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new ApiError(
      res.status,
      body?.error ?? {
        code: 'HTTP_ERROR',
        message: '잠시 후 다시 시도해주세요.',
      },
    )
  }
  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

export const api = request

let refreshing: Promise<string> | null = null

// refresh token은 한 번 쓰면 폐기되므로 동시에 여러 요청이 와도 한 번만 갱신한다
function refreshAccessToken() {
  refreshing ??= (async () => {
    const refreshToken = getRefreshToken()
    if (!refreshToken)
      throw new ApiError(401, {
        code: 'UNAUTHORIZED',
        message: '다시 로그인해주세요.',
      })
    try {
      const tokens = await request<TokenResponse>('/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      })
      saveTokens(tokens)
      return tokens.accessToken
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) clearTokens()
      throw error
    }
  })().finally(() => {
    refreshing = null
  })
  return refreshing
}

export async function authApi<T>(path: string, init?: RequestInit): Promise<T> {
  const withToken = (token: string | null) =>
    request<T>(path, {
      ...init,
      headers: { ...init?.headers, Authorization: `Bearer ${token}` },
    })

  try {
    return await withToken(getAccessToken())
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 401) throw error
    return withToken(await refreshAccessToken())
  }
}

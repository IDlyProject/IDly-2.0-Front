function base64url(bytes: Uint8Array) {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function createCodeVerifier() {
  return base64url(crypto.getRandomValues(new Uint8Array(32)))
}

export async function createChallenge(verifier: string) {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(verifier),
  )
  return base64url(new Uint8Array(digest))
}

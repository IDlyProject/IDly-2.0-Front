import { useState } from 'react'
import {
  getEmailDomain,
  getMailProviderGuide,
} from '@/features/onboarding/mailProviders.ts'

export function useMailConnectForm() {
  const [email, setEmailValue] = useState('')
  const [emailBlurred, setEmailBlurred] = useState(false)
  const [passwordInput, setPasswordInput] = useState({ for: '', value: '' })

  const domain = getEmailDomain(email)
  const guide = domain ? getMailProviderGuide(domain) : null
  const isCustomMail = domain !== null && guide === null && emailBlurred

  const normalize = (value: string) =>
    guide?.normalizePassword ? guide.normalizePassword(value) : value

  const password = passwordInput.for === guide?.id ? passwordInput.value : ''
  const setPassword = (value: string) =>
    setPasswordInput({ for: guide?.id ?? '', value: normalize(value) })

  const setEmail = (value: string) => {
    setEmailValue(value)
    setEmailBlurred(false)
  }

  return {
    email,
    setEmail,
    onEmailBlur: () => setEmailBlurred(true),
    guide,
    isCustomMail,
    password,
    setPassword,
  }
}

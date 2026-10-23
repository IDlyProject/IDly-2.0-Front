import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import GuideStepCard from '@/features/onboarding/components/GuideStepCard.tsx'
import StepIndicator from '@/features/onboarding/components/StepIndicator.tsx'
import {
  getEmailDomain,
  getMailProviderGuide,
} from '@/features/onboarding/mailProviders.ts'
import Button from '@/shared/components/ui/Button.tsx'
import InfoNotice from '@/shared/components/ui/InfoNotice.tsx'
import TextField from '@/shared/components/ui/TextField.tsx'

function Step2Page() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [emailBlurred, setEmailBlurred] = useState(false)
  const [passwordInput, setPasswordInput] = useState({ for: '', value: '' })

  const domain = getEmailDomain(email)
  const guide = domain ? getMailProviderGuide(domain) : null
  const password = passwordInput.for === guide?.id ? passwordInput.value : ''
  const setPassword = (value: string) =>
    setPasswordInput({ for: guide?.id ?? '', value })
  const isCustomMail = domain !== null && guide === null && emailBlurred

  const normalize = (value: string) =>
    guide?.normalizePassword ? guide.normalizePassword(value) : value

  const handlePaste = () =>
    navigator.clipboard
      .readText()
      .then((text) => setPassword(normalize(text)))
      .catch(() => undefined)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!guide) {
      navigate('/onboarding/mail/custom', { state: { email } })
      return
    }
    // TODO: 메일 연결 API 연동 전까지 검수용으로 바로 O3로 이동
    console.info('connect', guide.id, email)
    navigate('/onboarding/searching', { state: { email } })
  }

  return (
    <main className="flex w-full flex-col items-center">
      <StepIndicator current={2} />

      <div className="flex w-[440px] flex-col gap-5 pt-8">
        <h1 className="text-[30px] leading-[40.5px] font-extrabold tracking-[-1.35px] text-[#191f28]">
          메일을 연결해 주세요
        </h1>
        <p className="font-noto text-[15px] leading-[1.4] text-[#8b95a1]">
          먼저 메일 하나를 연결해요. 다른 메일로 가입한 계정은 메일을 더
          연결해서 함께 찾을 수 있어요.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-[448px] flex-col rounded-[28px] border border-[rgba(243,244,246,0.8)] bg-white p-9 shadow-[0px_20px_40px_-15px_rgba(28,32,41,0.07)]"
      >
        <div className="flex flex-col gap-5">
          <TextField
            variant="underline"
            label="메일 주소"
            type="email"
            autoComplete="email"
            placeholder="you@gmail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setEmailBlurred(false)
            }}
            onBlur={() => setEmailBlurred(true)}
            required
          />

          {guide && (
            <>
              <GuideStepCard
                title={guide.title}
                steps={guide.steps}
                variant={guide.id === 'naver' ? 'blue' : 'gray'}
              />

              <TextField
                variant="underline"
                label={
                  guide.passwordLabel.sub
                    ? `${guide.passwordLabel.main} ${guide.passwordLabel.sub}`
                    : guide.passwordLabel.main
                }
                type="password"
                autoComplete="off"
                className="pt-1 pb-3"
                inputClassName="tracking-[1.5px]"
                value={password}
                onChange={(e) => setPassword(normalize(e.target.value))}
                maxLength={guide.passwordMaxLength}
                required
                trailing={
                  <button
                    type="button"
                    onClick={handlePaste}
                    className="rounded-lg bg-[#f3f4f6] px-2.5 py-1 text-xs leading-4 font-semibold text-[#6e7687]"
                  >
                    붙여넣기
                  </button>
                }
              />
            </>
          )}

          {isCustomMail && (
            <InfoNotice className="break-keep">
              회사·학교 메일처럼 자동으로 찾기 어려운 메일이에요. 다음 화면에서
              메일 서버 정보를 입력해 연결해요.
            </InfoNotice>
          )}

          <Button type="submit" variant="primary" arrow>
            연결하기
          </Button>

          <p className="flex items-center justify-center gap-1 pt-[9px] pb-[1.75px] text-[#9ea5b4]">
            <span className="text-[11.5px] leading-[17.25px]">
              연결하면 메일 분석(국외 전송 포함)에 동의하게 돼요
            </span>
            <span aria-hidden="true" className="text-[10px] leading-[15px]">
              ›
            </span>
          </p>
        </div>
      </form>
    </main>
  )
}

export default Step2Page

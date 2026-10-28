import type { FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router'
import GuideStepCard from '@/features/onboarding/components/GuideStepCard.tsx'
import { useQuery } from '@tanstack/react-query'
import { listMailboxes } from '@/features/onboarding/api.ts'
import { useConnectMailbox } from '@/features/onboarding/hooks/useConnectMailbox.ts'
import { useMailConnectForm } from '@/features/onboarding/hooks/useMailConnectForm.ts'
import Badge from '@/shared/components/ui/Badge.tsx'
import Button from '@/shared/components/ui/Button.tsx'
import InfoNotice from '@/shared/components/ui/InfoNotice.tsx'
import TextField from '@/shared/components/ui/TextField.tsx'

type LocationState = { connectedEmail?: string } | null

function AddMailPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const stateEmail = (location.state as LocationState)?.connectedEmail
  const { data } = useQuery({
    queryKey: ['mailboxes'],
    queryFn: listMailboxes,
    enabled: !stateEmail,
  })
  const connectedEmail =
    stateEmail ?? data?.mailboxes.find((m) => m.isPrimary)?.email

  const {
    email,
    setEmail,
    onEmailBlur,
    guide,
    isCustomMail,
    password,
    setPassword,
  } = useMailConnectForm()
  const { connect, isPending, errorMessage } = useConnectMailbox()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!guide) {
      navigate('/onboarding/mail/custom', { state: { email } })
      return
    }
    connect({ email: email.trim(), password })
  }

  return (
    <main className="font-noto flex w-[520px] flex-col items-start gap-2.5">
      <Badge>계정 추가하기</Badge>

      <h1 className="pt-px text-[32px] leading-[43.2px] font-extrabold tracking-[-1.8px] text-[#1b2740]">
        메일을 추가해주세요
      </h1>

      <p className="text-sm leading-[24.5px] tracking-[-0.35px] text-[#919caf]">
        이미 연결된{' '}
        {connectedEmail ? (
          <strong className="font-bold text-[#77849a]">{connectedEmail}</strong>
        ) : (
          '메일'
        )}
        에 이어서 연결해요.
        <br />이 메일로 가입한 계정을 찾아 홈에 합쳐드려요.
      </p>

      <div className="pt-[18px]">
        <form
          onSubmit={handleSubmit}
          className="flex w-[520px] flex-col gap-3 rounded-[18px] border border-[#e2e7ef] bg-[rgba(255,255,255,0.84)] px-[25px] pt-6 pb-[25px] shadow-[0px_18px_50px_0px_rgba(28,45,78,0.07)]"
        >
          <TextField
            label="메일 주소"
            type="email"
            autoComplete="email"
            placeholder="you@naver.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={onEmailBlur}
            required
          />

          {guide && (
            <>
              <GuideStepCard
                title={guide.title}
                steps={guide.steps}
                variant="blue"
              />

              <TextField
                label={
                  <>
                    {guide.passwordLabel.main}
                    {guide.passwordLabel.sub && (
                      <span className="font-normal text-[#aab3c1]">
                        {' '}
                        {guide.passwordLabel.sub}
                      </span>
                    )}
                  </>
                }
                className="pt-[7px] pb-1.5"
                type="password"
                autoComplete="off"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={guide.passwordMaxLength}
                required
              />
            </>
          )}

          {isCustomMail && (
            <InfoNotice className="break-keep">
              회사·학교 메일처럼 자동으로 찾기 어려운 메일이에요. 다음 화면에서
              메일 서버 정보를 입력해 연결해요.
            </InfoNotice>
          )}

          <Button type="submit" variant="mirageCompact" disabled={isPending}>
            {isPending ? '연결하는 중…' : '연결하고 계정 추가'}
          </Button>

          {errorMessage && (
            <p role="alert" className="text-center text-xs text-[#e5484d]">
              {errorMessage}
            </p>
          )}

          <p className="pb-1 text-[11px] leading-[13px] text-[#9da6b4]">
            연결하면 메일 분석(국외 전송 포함)에 동의하게 돼요.
          </p>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="self-start text-xs leading-[14px] text-[#738096] underline"
          >
            취소하고 홈으로
          </button>
        </form>
      </div>
    </main>
  )
}

export default AddMailPage

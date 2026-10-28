import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import MascotStatus from '@/features/onboarding/components/MascotStatus.tsx'
import StepIndicator from '@/features/onboarding/components/StepIndicator.tsx'
import { useRunProgress } from '@/features/onboarding/hooks/useRunProgress.ts'
import Button from '@/shared/components/ui/Button.tsx'

type LocationState = { email?: string; runId?: string } | null

const formatCount = (n: number) => n.toLocaleString('ko-KR')

function Step3Page() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as LocationState
  const {
    run,
    resume,
    isResuming,
    resumeErrorMessage,
    isUnauthorized,
    isNotFound,
  } = useRunProgress(state?.runId)

  const email = run?.email ?? state?.email
  const scanned = run?.processed ?? 0
  const total = run?.total ?? 0
  const percent = run?.percent ?? 0
  const ratio = percent / 100
  const status = run?.status

  useEffect(() => {
    if (isUnauthorized) navigate('/onboarding', { replace: true })
    else if (isNotFound) navigate('/onboarding/mail', { replace: true })
  }, [isUnauthorized, isNotFound, navigate])

  useEffect(() => {
    if (status !== 'completed') return
    const timer = setTimeout(
      () =>
        navigate('/onboarding/found', {
          state: { email, foundCount: run?.foundAccountCount },
          replace: true,
        }),
      800,
    )
    return () => clearTimeout(timer)
  }, [status, email, run?.foundAccountCount, navigate])

  return (
    <main className="flex w-full flex-col items-center">
      <StepIndicator current={3} />

      {status === 'failed' ? (
        <>
          <MascotStatus status="error" title="메일에 연결하지 못했어요" />
          <FailedContent
            scanned={scanned}
            total={total}
            ratio={ratio}
            percent={percent}
            canResume={run?.failure?.retryable ?? false}
            isResuming={isResuming}
            errorMessage={resumeErrorMessage ?? run?.failure?.message}
            onRetry={resume}
          />
        </>
      ) : (
        <>
          <div className="pb-4">
            <MascotStatus status="progress" title="계정을 찾고 있어요" />
          </div>
          <ScanningContent
            scanned={scanned}
            total={total}
            ratio={ratio}
            percent={percent}
            email={email}
          />
        </>
      )}
    </main>
  )
}

type ProgressProps = {
  scanned: number
  total: number
  ratio: number
  percent: number
}

function ScanningContent({
  scanned,
  total,
  ratio,
  percent,
  email,
}: ProgressProps & { email?: string }) {
  return (
    <section className="flex w-[476px] flex-col gap-4 pt-[22px]">
      <div
        className="h-3.5 w-[479px] overflow-hidden rounded-full bg-[#eaeff5] px-[2.56px] py-0.5"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label="계정 찾기 진행률"
      >
        <div
          className="bg-ink h-full rounded-full transition-[width] duration-500 ease-out"
          style={{ width: `${ratio * 100}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="leading-[20.25px] text-[#384052]">
          <span className="text-sm font-medium">메일</span>
          <span className="font-inter text-[13.4px] font-medium"> </span>
          <span className="text-ink text-sm font-bold">
            {formatCount(scanned)}
          </span>
          <span className="font-inter text-[13.4px] font-medium"> / </span>
          <span className="text-sm font-medium">{formatCount(total)}통</span>
        </p>
        <p className="font-inter text-ink text-base leading-6 font-extrabold">
          {percent}%
        </p>
      </div>

      <div className="border-line-card bg-surface-muted rounded-2xl border p-3.5 text-center text-xs leading-4 text-[#6e7687]">
        {email && (
          <>
            <span className="text-ink font-bold">{email}</span>
            <span className="font-inter font-medium"> · </span>
          </>
        )}
        <span className="font-medium">창을 닫아도 계속 찾아요</span>
      </div>
    </section>
  )
}

function FailedContent({
  scanned,
  total,
  ratio,
  percent,
  canResume,
  isResuming,
  errorMessage,
  onRetry,
}: ProgressProps & {
  canResume: boolean
  isResuming: boolean
  errorMessage?: string | null
  onRetry: () => void
}) {
  return (
    <section className="font-noto flex w-[440px] flex-col gap-6 pt-10 leading-[1.4]">
      <div
        className="h-2 w-full overflow-hidden rounded bg-[#f2f4f6]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label="계정 찾기 진행률"
      >
        <div
          className="h-full rounded bg-[#b0b8c1]"
          style={{ width: `${ratio * 100}%` }}
        />
      </div>

      <div className="flex items-start justify-between text-[15px] text-[#191f28]">
        <p className="font-medium">
          메일 {formatCount(scanned)} / {formatCount(total)}통에서 멈췄어요
        </p>
        <p className="font-bold">{percent}%</p>
      </div>

      <p className="text-[13px] text-[#8b95a1]">
        앱 비밀번호가 바뀌었거나 IMAP 사용이 꺼졌을 수 있어요
      </p>

      <Button
        variant="dark"
        className="font-sans"
        onClick={onRetry}
        disabled={!canResume || isResuming}
      >
        {isResuming ? '다시 연결하는 중…' : '다시 연결하기'}
      </Button>

      {errorMessage && (
        <p role="alert" className="text-center text-xs text-[#e5484d]">
          {errorMessage}
        </p>
      )}

      <p className="text-[13px] text-[#8b95a1] underline">
        잠깐 끊긴 거라면 다시 시도 · 찾던 곳부터 이어서 해요
      </p>
    </section>
  )
}

export default Step3Page

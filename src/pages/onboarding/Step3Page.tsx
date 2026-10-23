import { useLocation } from 'react-router'
import MascotStatus from '@/features/onboarding/components/MascotStatus.tsx'
import StepIndicator from '@/features/onboarding/components/StepIndicator.tsx'
import { useMockScanProgress } from '@/features/onboarding/hooks/useMockScanProgress.ts'

type LocationState = { email?: string } | null

const formatCount = (n: number) => n.toLocaleString('ko-KR')

function Step3Page() {
  const location = useLocation()
  const email = (location.state as LocationState)?.email

  const { scanned, total } = useMockScanProgress(12480)
  const ratio = total > 0 ? scanned / total : 0
  const percent = Math.round(ratio * 100)

  return (
    <main className="flex w-full flex-col items-center">
      <StepIndicator current={3} />

      <div className="pb-4">
        <MascotStatus status="progress" title="계정을 찾고 있어요" />
      </div>

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
    </main>
  )
}

export default Step3Page

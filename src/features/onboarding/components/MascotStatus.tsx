import mascot from '@/shared/assets/images/mascot.svg'
import { cn } from '@/shared/lib/cn.ts'
import dotError from '@/shared/assets/images/status-dot-error.svg'
import dotProgress from '@/shared/assets/images/status-dot-progress.svg'
import dotSuccess from '@/shared/assets/images/status-dot-success.svg'

const statusDot = {
  progress: dotProgress,
  success: dotSuccess,
  error: dotError,
} as const

type MascotStatusProps = {
  /** progress: 찾는 중(노랑), success: 찾았어요(초록), error: 실패(빨강) */
  status: keyof typeof statusDot
  title: string
}

function MascotStatus({ status, title }: MascotStatusProps) {
  return (
    <div className="flex flex-col items-center pt-12">
      <div className="border-line-card bg-surface-muted relative flex h-36 w-34 items-center justify-center rounded-3xl border">
        <img src={mascot} alt="" width={108} height={110} />
        <img
          src={statusDot[status]}
          alt=""
          width={20}
          height={20}
          className={cn(
            'absolute -top-[5px] -right-[2px]',
            status === 'progress' && 'motion-safe:animate-blink',
          )}
        />
      </div>
      <h1 className="text-ink mt-[42px] text-2xl leading-8 font-bold tracking-[-0.6px]">
        {title}
      </h1>
    </div>
  )
}

export default MascotStatus

import { cn } from '@/shared/lib/cn.ts'

type StepIndicatorProps = {
  current: number
  total?: number
}

function StepIndicator({ current, total = 3 }: StepIndicatorProps) {
  return (
    <div
      className="flex items-center justify-center gap-2"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current}
      aria-label={`${total}단계 중 ${current}단계`}
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn(
            'h-[7px] rounded-full',
            i + 1 === current ? 'bg-navy w-7' : 'bg-dot-inactive w-[7px]',
          )}
        />
      ))}
    </div>
  )
}

export default StepIndicator

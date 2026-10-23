import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn.ts'

type BadgeProps = {
  children: ReactNode
  className?: string
}

/** 제목 위 작은 라벨  **/
function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'bg-badge-bg font-noto text-badge-text inline-flex items-center rounded-full px-2.5 py-[5px] text-xs leading-[14px] font-bold tracking-[-0.2px]',
        className,
      )}
    >
      {children}
    </span>
  )
}

export default Badge

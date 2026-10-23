import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn.ts'

const variantClass = {
  default:
    'border-[#e9edf3] bg-[#f2f5f9] py-[13px] text-xs leading-[19.8px] text-[#707d91]',
  compact:
    'border-[#e7ebf1] bg-[#f1f4f8] py-3 text-[11px] leading-normal text-[#8590a1]',
} as const

type InfoNoticeProps = {
  children: ReactNode
  variant?: keyof typeof variantClass
  className?: string
}

function InfoNotice({
  children,
  variant = 'default',
  className,
}: InfoNoticeProps) {
  return (
    <p
      className={cn(
        'font-noto w-full rounded-[11px] border px-[15px] whitespace-pre-wrap',
        variantClass[variant],
        className,
      )}
    >
      {'ⓘ   '}
      {children}
    </p>
  )
}

export default InfoNotice

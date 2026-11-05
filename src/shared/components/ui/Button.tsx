import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/shared/lib/cn.ts'

const variantClass = {
  social:
    'h-14 gap-[11px] rounded-[14px] border border-[#dde2ec] bg-white px-1.5 text-[15px] tracking-[-0.3px] text-navy',
  primary:
    'gap-2 rounded-2xl bg-ink py-4 text-[15px] leading-[22.5px] text-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]',
  mirage:
    'h-[58px] rounded-[11px] bg-[#1b2432] px-1.5 pt-[5px] pb-px text-[17px] leading-normal text-white',
  mirageCompact:
    'h-[54px] rounded-[11px] bg-[#1b2432] px-1.5 py-px font-noto text-[15px] leading-normal tracking-[-0.3px] text-white',
  dark: 'rounded-[14px] bg-[#191f28] px-5 py-[17px] text-lg leading-[1.4] text-white',
  soft: 'rounded-[14px] bg-[#f1f3f5] px-5 py-[17px] text-lg leading-[1.4] text-[#1a1f26]',
} as const

type Variant = keyof typeof variantClass

type ButtonProps = ComponentProps<'button'> & {
  variant: Variant
  leftIcon?: ReactNode
  arrow?: boolean
}

function Button({
  variant,
  leftIcon,
  arrow = false,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'flex w-full items-center justify-center font-bold disabled:cursor-not-allowed disabled:opacity-60',
        variantClass[variant],
        className,
      )}
      {...props}
    >
      {leftIcon}
      {variant === 'primary' ? (
        <>
          <span>{children}</span>
          {arrow && (
            <span aria-hidden="true" className="text-sm leading-5">
              →
            </span>
          )}
        </>
      ) : (
        <span className="whitespace-pre">
          {children}
          {arrow && <span aria-hidden="true">{'  →'}</span>}
        </span>
      )}
    </button>
  )
}

export default Button

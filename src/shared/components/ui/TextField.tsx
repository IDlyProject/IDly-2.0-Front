import { useId, type ComponentProps, type ReactNode } from 'react'
import { cn } from '@/shared/lib/cn.ts'

type TextFieldProps = ComponentProps<'input'> & {
  label: ReactNode
  variant?: 'underline' | 'box'
  trailing?: ReactNode
  inputClassName?: string
}

function TextField({
  label,
  variant = 'box',
  trailing,
  className,
  inputClassName,
  id,
  ...props
}: TextFieldProps) {
  const autoId = useId()
  const inputId = id ?? autoId

  if (variant === 'underline') {
    return (
      <div className={cn('flex w-full flex-col gap-1.5', className)}>
        <label
          htmlFor={inputId}
          className="text-xs leading-4 font-semibold text-[#9ea5b4]"
        >
          {label}
        </label>
        <div className="relative flex items-center pb-1">
          <input
            id={inputId}
            className={cn(
              'text-ink min-w-0 flex-1 bg-transparent py-1 text-[15px] leading-[22.5px] font-semibold outline-none placeholder:text-[#b3bbc8]',
              inputClassName,
            )}
            {...props}
          />
          {trailing}
          <span className="absolute inset-x-0 bottom-0 h-[1.5px] bg-[#d1d5db]" />
        </div>
      </div>
    )
  }

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <label
        htmlFor={inputId}
        className="font-noto text-xs font-bold tracking-[-0.2px] text-[#8c97a9]"
      >
        {label}
      </label>
      <div className="flex h-[49px] items-center rounded-[10px] border border-[#dde3ed] bg-white px-[15px] focus-within:border-[#8c97a9]">
        <input
          id={inputId}
          className={cn(
            'font-noto min-w-0 flex-1 bg-transparent text-[15px] text-[#263247] outline-none placeholder:text-[#b3bbc8]',
            inputClassName,
          )}
          {...props}
        />
        {trailing}
      </div>
    </div>
  )
}

export default TextField

import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn.ts'
import type { ServiceItem } from '../types.ts'
import ServiceIcon from './ServiceIcon.tsx'

type PanelServiceHeaderProps = {
  item: ServiceItem
  favorite: boolean
  onToggleFavorite: () => void
  iconBox?: boolean
  trailing?: ReactNode
  className?: string
}

function PanelServiceHeader({
  item,
  favorite,
  onToggleFavorite,
  iconBox = false,
  trailing,
  className,
}: PanelServiceHeaderProps) {
  return (
    <section className={cn('font-inter flex items-start gap-3.5', className)}>
      {item.service === 'youtube' ? (
        <div className="flex size-[54px] shrink-0 items-center justify-center rounded-[17px] bg-[#fff0ee]">
          <div className="flex h-[21px] w-[29px] items-center rounded-[7px] bg-[#ff1010] pl-3 drop-shadow-[0px_3px_3.5px_rgba(255,16,16,0.12)]">
            <div className="h-2.5 w-2 border-y-[5px] border-l-8 border-y-transparent border-l-white" />
          </div>
        </div>
      ) : iconBox ? (
        <div className="flex size-[54px] shrink-0 items-center justify-center">
          <ServiceIcon service={item.service} />
        </div>
      ) : (
        <ServiceIcon service={item.service} />
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-[5px]">
        <h2 className="text-[22px] leading-[26.4px] font-[820] tracking-[-1.21px] whitespace-pre-wrap text-[#18213d]">
          {item.name}
          {'  '}
          <button
            type="button"
            aria-pressed={favorite}
            aria-label={favorite ? '즐겨찾기 해제' : '즐겨찾기'}
            onClick={onToggleFavorite}
            className={cn(
              'align-baseline text-2xl font-normal transition-colors',
              favorite ? 'text-[#ff9b54]' : 'text-[#bfbfbf]',
            )}
          >
            ★
          </button>
        </h2>
        <p className="text-[11px] leading-[15.4px] text-[#7e899f]">
          {item.mailbox}으로 가입한 계정
        </p>
      </div>
      {trailing}
    </section>
  )
}

export default PanelServiceHeader

import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn.ts'
import type { ServiceItem, StatusDot } from '../types.ts'
import ServiceIcon from './ServiceIcon.tsx'

const dotClass: Record<StatusDot, string> = {
  blue: 'bg-[#2f6bff]',
  green: 'bg-[#1fc16b]',
  orange: 'bg-[#ffb020]',
}

const latinNames = new Set(['notion', 'figma'])
const MAX_ROWS = 3

type ServiceCardProps = {
  title: ReactNode
  items: ServiceItem[]
  onSelect: (item: ServiceItem, anchor: HTMLElement) => void
  emptyState?: ReactNode
  className?: string
}

function ServiceCard({
  title,
  items,
  onSelect,
  emptyState,
  className,
}: ServiceCardProps) {
  return (
    <section
      className={cn(
        'flex h-[310px] flex-col rounded-3xl bg-white p-7 drop-shadow-[0px_4px_12px_rgba(30,40,90,0.07)]',
        className,
      )}
    >
      <div className="flex h-[34px] items-center justify-between">
        <h2 className="flex items-center gap-2.5 text-2xl leading-normal font-extrabold text-[#141c3a]">
          {title}
        </h2>
        <button
          type="button"
          className="pb-0.5 text-[15px] leading-normal text-[#5b6280]"
        >
          전체 ›
        </button>
      </div>

      {items.length === 0 &&
        (emptyState ?? (
          <p className="flex flex-1 items-center justify-center text-base leading-normal text-[#9aa0b4]">
            이 메일과 관련된 서비스가 없어요
          </p>
        ))}

      <ul className="flex flex-col">
        {items.slice(0, MAX_ROWS).map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              data-service-row
              onClick={(e) => onSelect(item, e.currentTarget)}
              className={cn(
                'flex w-full items-center gap-5 text-left',
                index === 0 ? 'h-[92px] pt-3.5' : 'h-[78px]',
              )}
            >
              <ServiceIcon service={item.service} />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <p
                  className={cn(
                    'truncate text-[19px] leading-normal text-[#141c3a]',
                    latinNames.has(item.service)
                      ? 'pb-px font-bold'
                      : 'pt-0.5 pb-[3px] font-semibold',
                  )}
                >
                  {item.name}
                </p>
                <p className="flex h-[21px] items-center gap-[7px] text-base leading-normal text-[#80869c]">
                  <span
                    className={cn(
                      'size-[9px] shrink-0 rounded-[5px]',
                      dotClass[item.dot],
                    )}
                  />
                  <span className="truncate">{item.description}</span>
                </p>
              </div>
              {item.price && (
                <span className="py-0.5 text-[17px] leading-normal font-bold whitespace-nowrap text-[#141c3a]">
                  {item.price}
                </span>
              )}
              <span className="w-3.5 pb-px text-xl leading-normal text-[#9aa0b4]">
                ›
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ServiceCard

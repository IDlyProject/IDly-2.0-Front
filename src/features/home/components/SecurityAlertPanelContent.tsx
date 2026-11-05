import { useState } from 'react'
import { cn } from '@/shared/lib/cn.ts'
import type { SecurityAlertDetail, ServiceItem } from '../types.ts'
import PanelServiceHeader from './PanelServiceHeader.tsx'

type SecurityAlertPanelContentProps = {
  item: ServiceItem
  alert: SecurityAlertDetail
  favorite: boolean
  onToggleFavorite: () => void
  onDismiss: () => void
}

function SecurityAlertPanelContent({
  item,
  alert,
  favorite,
  onToggleFavorite,
  onDismiss,
}: SecurityAlertPanelContentProps) {
  const [selectedId, setSelectedId] = useState(alert.actions[0]?.id)
  const selected = alert.actions.find((action) => action.id === selectedId)

  return (
    <div className="flex flex-col px-8 pt-[74px] pb-6 tracking-[-0.16px]">
      <PanelServiceHeader
        item={item}
        favorite={favorite}
        onToggleFavorite={onToggleFavorite}
        className="-mr-[18px] tracking-normal"
      />

      <section className="mt-5 flex h-[110px] flex-col gap-[5px] overflow-hidden rounded-[20px] border border-[#e3e6ef] bg-[#f6f7fb] px-[22px] py-5">
        <span className="self-start rounded-lg border border-[#e3e6ef] bg-white px-2.5 py-1 text-[13px] leading-normal font-semibold text-[#7a8099]">
          보안 알림
        </span>
        <h3 className="pt-[7px] text-xl leading-7 font-extrabold text-[#1b2038]">
          {alert.title}
        </h3>
      </section>

      <fieldset className="mt-3.5 flex flex-col gap-2.5">
        <legend className="sr-only">조치 선택</legend>
        {alert.actions.map((action) => {
          const checked = action.id === selectedId
          return (
            <label
              key={action.id}
              className={cn(
                'flex h-[69px] cursor-pointer items-center gap-3.5 rounded-2xl border px-[18px] py-[15px] transition-colors',
                checked
                  ? 'border-[#202f61] bg-[#eef0f7]'
                  : 'border-[#e3e6ef] bg-white',
              )}
            >
              <input
                type="radio"
                name="security-action"
                value={action.id}
                checked={checked}
                onChange={() => setSelectedId(action.id)}
                className="sr-only"
              />
              <span
                className={cn(
                  'flex size-[22px] shrink-0 items-center justify-center rounded-[11px] border-2',
                  checked
                    ? 'border-[#202f61] bg-[#202f61]'
                    : 'border-[#c5cad9]',
                )}
              >
                {checked && (
                  <span className="size-2.5 rounded-[5px] bg-[#eef0f7]" />
                )}
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <strong className="text-base leading-normal font-bold text-[#1b2038]">
                  {action.title}
                </strong>
                <span className="text-[13.5px] leading-normal text-[#7a8099]">
                  {action.description}
                </span>
              </span>
              <span
                className={cn(
                  'shrink-0 rounded-lg px-2.5 py-1 text-[13px] leading-normal font-semibold',
                  checked
                    ? 'bg-white text-[#202f61]'
                    : 'bg-[#f6f7fb] text-[#7a8099]',
                )}
              >
                1회
              </span>
            </label>
          )
        })}
      </fieldset>

      <div className="mt-3.5 flex flex-col items-center gap-1.5">
        <button
          type="button"
          className="flex h-14 w-full items-center justify-center gap-1.5 rounded-2xl bg-[#202f61] text-base leading-normal font-bold tracking-normal text-white"
        >
          {selected?.title} 맡기기
          <span className="text-[#ff9b54]">· 1회</span>
        </button>
        <button
          type="button"
          onClick={onDismiss}
          className="px-3 py-2.5 text-sm leading-normal tracking-normal text-[#7a8099] underline"
        >
          본인이었어요 (알림 지우기)
        </button>
      </div>

      <section className="mt-1.5">
        <div className="flex items-center justify-between border-b border-[#e3e6ef] pb-2.5">
          <h3 className="text-base leading-normal font-extrabold text-[#1b2038]">
            근거 메일
          </h3>
          <span className="rounded-lg bg-[#f6f7fb] px-2.5 py-1 text-[13px] leading-normal font-semibold text-[#7a8099]">
            총 {alert.records.length}통
          </span>
        </div>
        <ul>
          {alert.records.map((record, index) => (
            <li
              key={`${record.date}-${index}`}
              className="flex items-center gap-3 border-b border-[#eff1f6] py-[13px]"
            >
              <span className="w-[60px] shrink-0 text-sm leading-normal text-[#7a8099]">
                {record.date}
              </span>
              <span className="shrink-0 rounded-lg bg-[#eef0f7] px-2.5 py-1 text-[12.5px] leading-normal font-bold text-[#202f61]">
                로그인
              </span>
              <span className="min-w-0 flex-1 truncate text-sm leading-[19.6px] text-[#33395a]">
                {record.title}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default SecurityAlertPanelContent

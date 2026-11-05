import { cn } from '@/shared/lib/cn.ts'
import type { MailRecordKind, ServiceItem } from '../types.ts'
import PanelServiceHeader from './PanelServiceHeader.tsx'

const recordTagClass: Record<MailRecordKind, string> = {
  payment: 'bg-[#f0f2f6] text-[#66728b]',
  login: 'bg-[#eef3ff] text-[#4b69bd]',
  signup: 'bg-[#f3edff] text-[#8164b6]',
}

const recordTagLabel: Record<MailRecordKind, string> = {
  payment: '결제',
  login: '로그인',
  signup: '가입',
}

type AccountPanelContentProps = {
  item: ServiceItem
  favorite: boolean
  onToggleFavorite: () => void
}

function AccountPanelContent({
  item,
  favorite,
  onToggleFavorite,
}: AccountPanelContentProps) {
  const detail = item.detail

  return (
    <div className="font-inter flex flex-col gap-3 px-[22px] pt-[84px] pb-[22px]">
      <PanelServiceHeader
        item={item}
        favorite={favorite}
        onToggleFavorite={onToggleFavorite}
        iconBox
        trailing={
          detail?.billing && (
            <span className="mt-0.5 flex shrink-0 items-center gap-[5px] rounded-full border border-[#d9f1e4] bg-[#effaf4] px-2 pt-[7px] pb-2 text-[10px] leading-normal font-[750] whitespace-nowrap text-[#21865a]">
              <span className="size-[5px] rounded-[2.5px] bg-[#27b875]" />
              구독 중
            </span>
          )
        }
      />

      {detail?.billing && (
        <section className="flex flex-col gap-[7px] rounded-[17px] border border-[#e9edf5] bg-[linear-gradient(113.69deg,#f7f8fc_0%,#f3f5fb_100%)] px-4 pt-5 pb-[13px]">
          <span className="self-start rounded-md border border-[#e8ebf3] bg-white px-1.5 pt-[5px] pb-1.5 text-[10px] leading-normal text-[#69758e]">
            정기 결제
          </span>
          <p className="text-[31px] leading-[34.1px] font-[850] tracking-[-2.015px] text-[#18213d]">
            {detail.billing.amount}
          </p>
          <div className="flex items-center gap-[7px] pt-[5px] text-[11px] leading-normal text-[#7e899f]">
            <span className="flex size-[22px] items-center justify-center rounded-[7px] border border-[#e3e8f1] bg-white pt-[2.5px] pb-[3.5px] text-xs text-[#68748d]">
              ▦
            </span>
            <span className="pt-px pb-0.5">
              다음 결제{' '}
              <strong className="font-bold text-[#18213d]">
                {detail.billing.nextBillingDate}
              </strong>
            </span>
            <span className="h-[13px] w-px bg-[#dce1eb]" />
            <span className="pt-px pb-0.5">{detail.billing.note}</span>
          </div>
        </section>
      )}

      <div className="flex gap-[13px] pt-1 pl-1">
        {detail?.canCancelSubscription && (
          <button
            type="button"
            className="min-h-[43px] flex-1 rounded-[11px] bg-[#202f61] py-[13px] text-[11px] leading-normal font-[750] text-white"
          >
            구독 해지 맡기기 · 1회
          </button>
        )}
        <button
          type="button"
          className="min-h-[43px] flex-1 rounded-[11px] border border-[#dfe5ef] bg-white py-[13px] text-[11px] leading-normal font-[750] text-[#4e5a75]"
        >
          탈퇴 맡기기 · 1회
        </button>
      </div>

      {detail && detail.records.length > 0 && (
        <section className="flex flex-col gap-[9px] pt-1.5">
          <div className="flex items-center justify-between">
            <h3 className="pt-px pb-0.5 text-[13px] leading-normal font-[820] tracking-[-0.39px] text-[#18213d]">
              관련 메일에서 확인한 기록
            </h3>
            <span className="rounded-md bg-[#f2f4f8] px-1.5 pt-[5px] pb-1.5 text-[10px] leading-normal font-bold text-[#7e899f]">
              총 {detail.totalMailCount}통
            </span>
          </div>
          <ul className="border-t border-[#e9edf4]">
            {detail.records.map((record, index) => (
              <li
                key={`${record.date}-${index}`}
                className="flex min-h-[45px] items-center gap-[7px] border-b border-[#f0f2f7] px-px py-1.5 last:border-b-0"
              >
                <span className="w-[57px] shrink-0 pt-px pb-0.5 text-[10px] leading-normal text-[#7e899f]">
                  {record.date}
                </span>
                <span
                  className={cn(
                    'w-[42px] shrink-0 rounded-[5px] p-[5px] text-center text-[9px] leading-[9px] font-[750]',
                    recordTagClass[record.kind],
                  )}
                >
                  {recordTagLabel[record.kind]}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-[1.5px] text-[10px] leading-[14.5px] text-[#303a52]">
                  <p>
                    {record.title}
                    {record.amount && (
                      <>
                        {' '}
                        <strong className="font-bold">{record.amount}</strong>
                      </>
                    )}
                  </p>
                  {record.caption && (
                    <p className="text-[9px] leading-[13px] text-[#7e899f]">
                      {record.caption}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default AccountPanelContent

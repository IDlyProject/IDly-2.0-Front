import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import closeIcon from '@/shared/assets/icons/close.svg'
import panelPointer from '@/shared/assets/images/home/panel-pointer.svg'
import { cn } from '@/shared/lib/cn.ts'
import type { MailRecordKind, ServiceItem } from '../types.ts'
import ServiceIcon from './ServiceIcon.tsx'

const PANEL_WIDTH = 520
const PANEL_MAX_HEIGHT = 750
const VIEWPORT_GAP = 16
const ROW_OVERLAP = 58
const POINTER_SIZE = 54
const POINTER_OUTSET = 39
const ICON_POINTER_GAP = 12
const CLOSE_DURATION = 160

type Side = 'right' | 'left'

type Layout = {
  side: Side
  left: number
  top: number
  height: number
  pointerTop: number
}

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

function measure(anchor: HTMLElement): Layout {
  const row = anchor.getBoundingClientRect()
  const icon = (anchor.firstElementChild ?? anchor).getBoundingClientRect()
  const centerY = icon.top + icon.height / 2
  const viewportWidth = document.documentElement.clientWidth
  const viewportHeight = window.innerHeight
  const height = Math.min(PANEL_MAX_HEIGHT, viewportHeight - VIEWPORT_GAP * 2)

  let side: Side = 'right'
  let left = row.right - ROW_OVERLAP
  if (left + PANEL_WIDTH > viewportWidth - VIEWPORT_GAP) {
    const leftSide = icon.left - ICON_POINTER_GAP - POINTER_OUTSET - PANEL_WIDTH
    if (leftSide >= VIEWPORT_GAP) {
      side = 'left'
      left = leftSide
    } else {
      left = Math.max(VIEWPORT_GAP, viewportWidth - VIEWPORT_GAP - PANEL_WIDTH)
    }
  }

  const top = Math.min(
    Math.max(centerY - 478, VIEWPORT_GAP),
    viewportHeight - VIEWPORT_GAP - height,
  )
  const pointerTop = Math.min(
    Math.max(centerY - POINTER_SIZE / 2, top + 24),
    top + height - 24 - POINTER_SIZE,
  )

  return {
    side,
    left: left + window.scrollX,
    top: top + window.scrollY,
    height,
    pointerTop: pointerTop + window.scrollY,
  }
}

type ServicePanelProps = {
  item: ServiceItem
  anchor: HTMLElement
  favorite: boolean
  onToggleFavorite: () => void
  onClose: () => void
}

function ServicePanel({
  item,
  anchor,
  favorite,
  onToggleFavorite,
  onClose,
}: ServicePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [layout, setLayout] = useState<Layout>(() => measure(anchor))
  const [visible, setVisible] = useState(false)

  const requestClose = useCallback(() => {
    setVisible(false)
    window.setTimeout(onClose, CLOSE_DURATION)
  }, [onClose])

  useLayoutEffect(() => {
    const update = () => {
      if (anchor.isConnected) setLayout(measure(anchor))
    }
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [anchor])

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Element
      if (panelRef.current?.contains(target)) return
      if (target.closest('[data-service-row]')) return
      requestClose()
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [requestClose])

  const { side, left, top, height, pointerTop } = layout
  const pointerLeft =
    side === 'right'
      ? left - POINTER_OUTSET
      : left + PANEL_WIDTH + POINTER_OUTSET - POINTER_SIZE
  const detail = item.detail

  return createPortal(
    <>
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute z-40 transition duration-200 ease-out motion-reduce:transition-none',
          side === 'right' ? 'origin-left' : 'origin-right',
          visible ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
        )}
        style={{
          left: pointerLeft,
          top: pointerTop,
          width: POINTER_SIZE,
          height: POINTER_SIZE,
        }}
      >
        <div
          className={cn(
            'flex size-full items-center justify-center',
            side === 'right' ? '-rotate-90' : 'rotate-90',
          )}
        >
          <img src={panelPointer} alt="" width={51.8431} height={48.5} />
        </div>
      </div>

      <div
        ref={panelRef}
        role="dialog"
        aria-label={`${item.name} 상세`}
        className={cn(
          'font-inter absolute z-50 overflow-y-auto rounded-[23px] border border-[rgba(223,228,239,0.9)] bg-white shadow-[0px_20px_65px_0px_rgba(28,42,83,0.15),0px_3px_12px_0px_rgba(28,42,83,0.04)] transition ease-out motion-reduce:transition-none',
          side === 'right' ? 'origin-left' : 'origin-right',
          visible
            ? 'translate-x-0 scale-100 opacity-100 delay-100 duration-200'
            : cn(
                'scale-[0.97] opacity-0 duration-150',
                side === 'right' ? '-translate-x-4' : 'translate-x-4',
              ),
        )}
        style={{ left, top, width: PANEL_WIDTH, height }}
      >
        <button
          type="button"
          aria-label="닫기"
          onClick={requestClose}
          className="absolute top-[22px] right-[25px] flex size-10 items-center justify-center rounded-[20px] bg-[#f6f7fb]"
        >
          <img src={closeIcon} alt="" width={16} height={16} />
        </button>

        <div className="flex flex-col gap-3 px-[22px] pt-[84px] pb-[22px]">
          <section className="flex items-start gap-3.5">
            {item.service === 'youtube' ? (
              <div className="flex size-[54px] shrink-0 items-center justify-center rounded-[17px] bg-[#fff0ee]">
                <div className="flex h-[21px] w-[29px] items-center rounded-[7px] bg-[#ff1010] pl-3 drop-shadow-[0px_3px_3.5px_rgba(255,16,16,0.12)]">
                  <div className="h-2.5 w-2 border-y-[5px] border-l-8 border-y-transparent border-l-white" />
                </div>
              </div>
            ) : (
              <div className="flex size-[54px] shrink-0 items-center justify-center">
                <ServiceIcon service={item.service} />
              </div>
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
            {detail?.billing && (
              <span className="mt-0.5 flex shrink-0 items-center gap-[5px] rounded-full border border-[#d9f1e4] bg-[#effaf4] px-2 pt-[7px] pb-2 text-[10px] leading-normal font-[750] whitespace-nowrap text-[#21865a]">
                <span className="size-[5px] rounded-[2.5px] bg-[#27b875]" />
                구독 중
              </span>
            )}
          </section>

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
                            <strong className="font-bold">
                              {record.amount}
                            </strong>
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
      </div>
    </>,
    document.body,
  )
}

export default ServicePanel

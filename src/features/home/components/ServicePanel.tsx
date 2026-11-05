import {
  type ReactNode,
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

const PANEL_WIDTH = 520
const PANEL_MAX_HEIGHT = 750
const VIEWPORT_GAP = 16
const ROW_OVERLAP = 58
const POINTER_SIZE = 54
const POINTER_OUTSET = 39
const ICON_POINTER_GAP = 12
export const PANEL_CLOSE_DURATION = 160

type Side = 'right' | 'left'

type Layout = {
  side: Side
  left: number
  top: number
  height: number
  pointerTop: number
}

export type PanelVariant = 'account' | 'security'

const variantClass: Record<PanelVariant, { panel: string; close: string }> = {
  account: {
    panel:
      'border border-[rgba(223,228,239,0.9)] shadow-[0px_20px_65px_0px_rgba(28,42,83,0.15),0px_3px_12px_0px_rgba(28,42,83,0.04)]',
    close: 'top-[22px] right-[25px]',
  },
  security: {
    panel: 'shadow-[0px_24px_60px_0px_rgba(32,47,97,0.28)]',
    close: 'top-6 right-6',
  },
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
  label: string
  anchor: HTMLElement
  variant: PanelVariant
  onClose: () => void
  children: (close: () => void) => ReactNode
}

function ServicePanel({
  label,
  anchor,
  variant,
  onClose,
  children,
}: ServicePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [layout, setLayout] = useState<Layout>(() => measure(anchor))
  const [visible, setVisible] = useState(false)

  const requestClose = useCallback(() => {
    setVisible(false)
    window.setTimeout(onClose, PANEL_CLOSE_DURATION)
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
        aria-label={label}
        className={cn(
          'absolute z-50 overflow-y-auto rounded-[23px] bg-white transition ease-out motion-reduce:transition-none',
          variantClass[variant].panel,
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
          className={cn(
            'absolute flex size-10 items-center justify-center rounded-[20px] bg-[#f6f7fb]',
            variantClass[variant].close,
          )}
        >
          <img src={closeIcon} alt="" width={16} height={16} />
        </button>

        {children(requestClose)}
      </div>
    </>,
    document.body,
  )
}

export default ServicePanel

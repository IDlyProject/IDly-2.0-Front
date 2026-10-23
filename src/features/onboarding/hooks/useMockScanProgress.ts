import { useCallback, useEffect, useRef, useState } from 'react'

export type ScanStatus = 'scanning' | 'failed' | 'done'

type Options = {
  intervalMs?: number
  steps?: number
  failAt?: number
}

// TODO: 검색 진행 상황 API 연동 시 교체
export function useMockScanProgress(
  total: number,
  { intervalMs = 1000, steps = 10, failAt }: Options = {},
) {
  const [scanned, setScanned] = useState(0)
  const [status, setStatus] = useState<ScanStatus>('scanning')
  const scannedRef = useRef(0)
  const hasFailedRef = useRef(false)

  useEffect(() => {
    if (status !== 'scanning') return

    const batch = Math.ceil(total / steps)
    const timer = setInterval(() => {
      let next = Math.min(scannedRef.current + batch, total)
      const shouldFail =
        failAt !== undefined && !hasFailedRef.current && next >= failAt
      if (shouldFail) next = failAt

      scannedRef.current = next
      setScanned(next)

      if (shouldFail) {
        hasFailedRef.current = true
        setStatus('failed')
      } else if (next === total) {
        setStatus('done')
      }
    }, intervalMs)

    return () => clearInterval(timer)
  }, [status, total, intervalMs, steps, failAt])

  const retry = useCallback(() => setStatus('scanning'), [])

  return { scanned, total, status, retry }
}

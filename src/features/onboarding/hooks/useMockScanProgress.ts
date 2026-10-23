import { useEffect, useState } from 'react'

// TODO: 검색 진행 상황 API 연동 시 교체
export function useMockScanProgress(
  total: number,
  { intervalMs = 1000, steps = 10 } = {},
) {
  const [scanned, setScanned] = useState(0)

  useEffect(() => {
    const batch = Math.ceil(total / steps)
    const timer = setInterval(() => {
      setScanned((prev) => {
        const next = Math.min(prev + batch, total)
        if (next === total) clearInterval(timer)
        return next
      })
    }, intervalMs)
    return () => clearInterval(timer)
  }, [total, intervalMs, steps])

  return { scanned, total }
}

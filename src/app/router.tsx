import { createBrowserRouter } from 'react-router'
import HomePage from '@/pages/HomePage.tsx'
import UiPreviewPage from '@/pages/dev/UiPreviewPage.tsx'

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  // 개발 중에만 열리는 공통 컴포넌트 미리보기
  ...(import.meta.env.DEV
    ? [{ path: '/dev/ui', element: <UiPreviewPage /> }]
    : []),
])

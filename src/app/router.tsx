import { createBrowserRouter } from 'react-router'
import AuthCallbackPage from '@/pages/auth/AuthCallbackPage.tsx'
import HomePage from '@/pages/HomePage.tsx'
import UiPreviewPage from '@/pages/dev/UiPreviewPage.tsx'
import AddMailPage from '@/pages/onboarding/AddMailPage.tsx'
import OnboardingLayout from '@/pages/onboarding/OnboardingLayout.tsx'
import Step1Page from '@/pages/onboarding/Step1Page.tsx'
import Step2ErrorPage from '@/pages/onboarding/Step2ErrorPage.tsx'
import Step2CustomPage from '@/pages/onboarding/Step2CustomPage.tsx'
import Step2Page from '@/pages/onboarding/Step2Page.tsx'
import Step3Page from '@/pages/onboarding/Step3Page.tsx'
import Step4Page from '@/pages/onboarding/Step4Page.tsx'

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/auth/callback', element: <AuthCallbackPage /> },
  {
    path: '/onboarding',
    element: <OnboardingLayout />,
    children: [
      { index: true, element: <Step1Page /> },
      { path: 'mail', element: <Step2Page /> },
      { path: 'mail/custom', element: <Step2CustomPage /> },
      { path: 'mail/add', element: <AddMailPage /> },
      { path: 'mail/error', element: <Step2ErrorPage /> },
      { path: 'searching', element: <Step3Page /> },
      { path: 'found', element: <Step4Page /> },
    ],
  },
  // 개발 중에만 열리는 공통 컴포넌트 미리보기
  ...(import.meta.env.DEV
    ? [{ path: '/dev/ui', element: <UiPreviewPage /> }]
    : []),
])

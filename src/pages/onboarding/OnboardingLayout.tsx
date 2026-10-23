import { Outlet } from 'react-router'
import AppHeader from '@/shared/components/AppHeader.tsx'

function OnboardingLayout() {
  return (
    <div className="bg-page flex min-h-screen flex-col items-center pb-20">
      <AppHeader />
      <Outlet />
    </div>
  )
}

export default OnboardingLayout

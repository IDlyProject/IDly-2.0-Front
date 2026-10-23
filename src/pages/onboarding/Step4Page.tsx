import { useLocation, useNavigate } from 'react-router'
import MascotStatus from '@/features/onboarding/components/MascotStatus.tsx'
import StepIndicator from '@/features/onboarding/components/StepIndicator.tsx'
import Button from '@/shared/components/ui/Button.tsx'

type LocationState = { email?: string } | null

// TODO: 검색 결과 API 연동 시 교체
const MOCK_FOUND_COUNT = 41

function Step4Page() {
  const location = useLocation()
  const navigate = useNavigate()
  const email = (location.state as LocationState)?.email

  return (
    <main className="flex w-full flex-col items-center">
      <StepIndicator current={3} />

      <MascotStatus
        status="success"
        title={`계정 ${MOCK_FOUND_COUNT}개를 찾았어요`}
      />

      <div className="flex w-[440px] flex-col gap-6 pt-10">
        {email && (
          <p className="font-noto text-[15px] leading-[1.4] text-[#8b95a1]">
            {email}에서 찾았어요
          </p>
        )}

        <Button variant="dark" onClick={() => navigate('/')}>
          확인하러 가기
        </Button>
        <Button
          variant="soft"
          onClick={() =>
            navigate('/onboarding/mail/add', {
              state: { connectedEmail: email },
            })
          }
        >
          다른 메일도 연결하기
        </Button>

        <p className="font-noto text-[13px] leading-[1.4] text-[#8b95a1]">
          네이버·회사 메일로 가입한 계정까지 한곳에 모아요
        </p>
      </div>
    </main>
  )
}

export default Step4Page

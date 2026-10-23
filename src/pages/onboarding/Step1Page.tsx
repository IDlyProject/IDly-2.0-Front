import StepIndicator from '@/features/onboarding/components/StepIndicator.tsx'
import apple from '@/shared/assets/icons/apple.svg'
import google from '@/shared/assets/icons/google.svg'
import kakao from '@/shared/assets/icons/kakao.svg'
import mascotSmall from '@/shared/assets/images/mascot-small.svg'
import Button from '@/shared/components/ui/Button.tsx'

type SocialProvider = 'google' | 'apple' | 'kakao'

const providers: { id: SocialProvider; label: string; icon: string }[] = [
  { id: 'google', label: 'Google로 계속하기', icon: google },
  { id: 'apple', label: 'Apple로 계속하기', icon: apple },
  { id: 'kakao', label: '카카오로 계속하기', icon: kakao },
]

/** O1 시작하기 */
function Step1Page() {
  const handleLogin = (provider: SocialProvider) => {
    // TODO: 소셜 로그인 연동
    console.info('login', provider)
  }

  return (
    <main className="flex w-[520px] flex-col items-center gap-4">
      <StepIndicator current={1} />

      <div className="flex h-[72px] w-40 flex-col items-center pt-[18px]">
        <img src={mascotSmall} alt="" width={56} height={58} />
      </div>

      <h1 className="text-navy pt-2.5 text-center text-[30px] leading-[40.5px] font-extrabold tracking-[-1.35px]">
        로그인하고 시작해요
      </h1>

      <p className="text-center text-[15px] leading-[25.5px] tracking-[-0.3px] text-[#818ba3]">
        IDly의 모든 기능을 사용하려면
        <br />
        간단한 로그인이 필요해요.
      </p>

      <section className="flex w-full flex-col items-center gap-[18px] rounded-[22px] border border-[rgba(221,226,236,0.85)] bg-[rgba(255,255,255,0.94)] px-6 pt-[46px] pb-[26px] shadow-[0px_20px_60px_0px_rgba(37,49,84,0.06)]">
        <div className="flex w-full flex-col gap-2.5">
          {providers.map(({ id, label, icon }) => (
            <Button
              key={id}
              variant="social"
              leftIcon={<img src={icon} alt="" width={19} height={19} />}
              onClick={() => handleLogin(id)}
            >
              {label}
            </Button>
          ))}
        </div>

        <p className="w-[458px] text-center text-[11px] leading-[18.7px] tracking-[-0.22px] text-[#a1a9b9]">
          로그인하면 <strong className="font-bold">이용약관</strong> 및{' '}
          <strong className="font-bold">개인정보처리방침</strong>에 동의한
          것으로 간주됩니다.
        </p>
      </section>
    </main>
  )
}

export default Step1Page

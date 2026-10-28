import { useLocation, useNavigate } from 'react-router'
import type { ConnectErrorState } from '@/features/onboarding/hooks/useConnectMailbox.ts'
import mascotError from '@/shared/assets/images/mascot-error.svg'
import Badge from '@/shared/components/ui/Badge.tsx'
import Button from '@/shared/components/ui/Button.tsx'
import InfoNotice from '@/shared/components/ui/InfoNotice.tsx'

const defaultChecklist = [
  '로그인하지 못했어요. 앱 비밀번호가 맞는지, Gmail에서 IMAP이 켜져 있는지 확인해주세요.',
  '포트 번호가 993인지 확인해주세요.',
  '비밀번호를 다시 한 번 입력해주세요.',
]

function Step2ErrorPage() {
  const navigate = useNavigate()
  const error = useLocation().state as ConnectErrorState | null
  const checklist = error?.hints.length ? error.hints : defaultChecklist
  const showAppPasswordLink = !error || error.provider === 'gmail'

  return (
    <main className="font-noto flex w-[680px] flex-col items-center">
      <div className="relative size-28 rounded-[32px] bg-[linear-gradient(145deg,#eef4ff_0%,#fff0f3_100%)]">
        <img
          src={mascotError}
          alt=""
          width={78}
          height={62}
          className="absolute top-[25px] left-[17px]"
        />
      </div>

      <Badge className="mt-[23px]">계정 연결하기</Badge>

      <h1 className="mt-3.5 h-11 text-center text-[32px] leading-[43.2px] font-extrabold tracking-[-1.8px] text-[#1b2740]">
        메일을 연결하지 못했어요
      </h1>

      <p className="mt-[9.19px] text-center text-sm leading-[24.5px] tracking-[-0.35px] text-[#919caf]">
        입력하신 정보로 메일 서버에 연결할 수 없어요.
        <br />
        아래 내용을 확인한 뒤 다시 시도해주세요.
      </p>

      <section className="mt-7 flex w-full flex-col gap-2 rounded-[15px] border border-[#f7d9de] bg-[#fff1f3] px-5 pt-[18px] pb-[22px]">
        <h2 className="text-sm leading-[24.5px] font-extrabold text-[#394459]">
          확인해 주세요
        </h2>
        <ul className="flex list-disc flex-col gap-1 pl-[18px] text-xs leading-[21px] text-[#70798a]">
          {checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <Button
        variant="mirageCompact"
        arrow
        className="mt-[15.5px]"
        onClick={() => navigate(error?.retryPath ?? '/onboarding/mail/custom')}
      >
        다시 연결하기
      </Button>

      {showAppPasswordLink && (
        <a
          href="https://myaccount.google.com/apppasswords"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3.5 self-start text-xs leading-[14px] text-[#6d7b91] underline"
        >
          앱 비밀번호 새로 만들기 ↗
        </a>
      )}

      <InfoNotice variant="compact" className="mt-[19px]">
        서버에 연결할 수 없을 때는 잠시 후 다시 시도해주세요.
      </InfoNotice>
    </main>
  )
}

export default Step2ErrorPage

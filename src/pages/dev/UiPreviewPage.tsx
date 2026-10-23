import type { ReactNode } from 'react'
import StepIndicator from '@/features/onboarding/components/StepIndicator.tsx'
import MascotStatus from '@/features/onboarding/components/MascotStatus.tsx'
import apple from '@/shared/assets/icons/apple.svg'
import google from '@/shared/assets/icons/google.svg'
import kakao from '@/shared/assets/icons/kakao.svg'
import mascotError from '@/shared/assets/images/mascot-error.svg'
import mascotSmall from '@/shared/assets/images/mascot-small.svg'
import AppHeader from '@/shared/components/AppHeader.tsx'
import Badge from '@/shared/components/ui/Badge.tsx'
import Button from '@/shared/components/ui/Button.tsx'
import InfoNotice from '@/shared/components/ui/InfoNotice.tsx'
import TextField from '@/shared/components/ui/TextField.tsx'

/** 개발용: 공통 컴포넌트 미리보기 (/dev/ui) */
function UiPreviewPage() {
  return (
    <div className="bg-page min-h-screen pb-20">
      <AppHeader />
      <div className="mx-auto flex w-[520px] flex-col gap-10">
        <Section title="StepIndicator">
          <StepIndicator current={1} />
          <StepIndicator current={2} />
          <StepIndicator current={3} />
        </Section>

        <Section title="MascotStatus">
          <MascotStatus status="progress" title="계정을 찾고 있어요" />
          <MascotStatus status="success" title="계정 41개를 찾았어요" />
          <MascotStatus status="error" title="메일에 연결하지 못했어요" />
        </Section>

        <Section title="이미지">
          <div className="flex items-center gap-6">
            <img src={mascotSmall} alt="" width={56} height={58} />
            <img src={mascotError} alt="" width={78} height={62} />
          </div>
        </Section>

        <Section title="Button">
          <Button
            variant="social"
            leftIcon={<img src={google} alt="" width={19} height={19} />}
          >
            Google로 계속하기
          </Button>
          <Button
            variant="social"
            leftIcon={<img src={apple} alt="" width={19} height={19} />}
          >
            Apple로 계속하기
          </Button>
          <Button
            variant="social"
            leftIcon={<img src={kakao} alt="" width={19} height={19} />}
          >
            카카오로 계속하기
          </Button>
          <Button variant="primary" arrow>
            연결하기
          </Button>
          <Button variant="mirage" arrow>
            연결하기
          </Button>
          <Button variant="mirageCompact" arrow>
            다시 연결하기
          </Button>
          <Button variant="dark">확인하러 가기</Button>
          <Button variant="soft">다른 메일도 연결하기</Button>
        </Section>

        <Section title="TextField">
          <TextField
            variant="underline"
            label="메일 주소"
            defaultValue="jihye.kim@gmail.com"
          />
          <TextField
            variant="underline"
            label="앱 비밀번호 16자리"
            type="password"
            trailing={
              <button
                type="button"
                className="rounded-lg bg-[#f3f4f6] px-2.5 py-1 text-xs font-semibold text-[#6e7687]"
              >
                붙여넣기
              </button>
            }
          />
          <TextField label="메일 주소" defaultValue="jihye@company.co.kr" />
          <TextField
            label={
              <>
                비밀번호{' '}
                <span className="font-normal text-[#aab3c1]">
                  (또는 앱 비밀번호)
                </span>
              </>
            }
            type="password"
            placeholder="비밀번호를 입력해주세요"
          />
        </Section>

        <Section title="Badge / InfoNotice">
          <div className="flex gap-2">
            <Badge>회사 · 학교 메일</Badge>
            <Badge>계정 연결하기</Badge>
          </div>
          <InfoNotice>
            Outlook · Hotmail은 Microsoft 정책으로{' '}
            <strong className="font-bold text-[#455269]">
              아직 연결할 수 없어요.
            </strong>
          </InfoNotice>
          <InfoNotice variant="compact">
            서버에 연결할 수 없을 때는 잠시 후 다시 시도해주세요.
          </InfoNotice>
        </Section>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-bold text-[#818ba3]">{title}</h2>
      {children}
    </section>
  )
}

export default UiPreviewPage

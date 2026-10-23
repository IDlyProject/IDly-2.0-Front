import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router'
import Badge from '@/shared/components/ui/Badge.tsx'
import Button from '@/shared/components/ui/Button.tsx'
import InfoNotice from '@/shared/components/ui/InfoNotice.tsx'
import TextField from '@/shared/components/ui/TextField.tsx'

type LocationState = { email?: string } | null

function Step2CustomPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const initialEmail = (location.state as LocationState)?.email ?? ''

  const [email, setEmail] = useState(initialEmail)
  const [imapHost, setImapHost] = useState('')
  const [port, setPort] = useState('993')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: 메일 서버 연결 API 호출 (성공: O3, 실패: O2c). 연동 전까지 검수용으로 바로 O3로 이동
    console.info('connect custom', { email, imapHost, port })
    navigate('/onboarding/searching', { state: { email } })
  }

  return (
    <main className="flex w-[536px] flex-col items-start gap-2.5">
      <Badge>회사 · 학교 메일</Badge>

      <h1 className="font-noto pt-[1.095px] text-[32px] leading-[43.2px] font-extrabold tracking-[-1.8px] text-[#1b2740]">
        메일 서버 정보를
        <br />
        알려주세요
      </h1>

      <p className="text-sm leading-[24.5px] tracking-[-0.35px] text-[#919caf]">
        회사·학교 메일처럼 자동으로 찾기 어려운 메일이에요.
        <br />
        아래 정보를 입력하면 직접 연결해드릴게요.
      </p>

      <div className="pt-5">
        <form
          onSubmit={handleSubmit}
          className="flex w-[520px] flex-col gap-3.5 rounded-[18px] border border-[#e2e7ef] bg-[rgba(255,255,255,0.84)] px-[25px] pt-6 pb-[23px] shadow-[0px_18px_50px_0px_rgba(28,45,78,0.07)]"
        >
          <TextField
            label="메일 주소"
            type="email"
            autoComplete="email"
            placeholder="you@company.co.kr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="IMAP 서버"
            className="pt-1"
            placeholder="imap.company.co.kr"
            autoCapitalize="off"
            spellCheck={false}
            value={imapHost}
            onChange={(e) => setImapHost(e.target.value)}
            required
          />
          <TextField
            label="포트"
            className="pt-1"
            inputMode="numeric"
            value={port}
            onChange={(e) => setPort(e.target.value.replace(/\D/g, ''))}
            required
          />
          <TextField
            label={
              <>
                비밀번호{' '}
                <span className="font-normal text-[#aab3c1]">
                  (또는 앱 비밀번호)
                </span>
              </>
            }
            className="pt-1"
            type="password"
            autoComplete="off"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="mirage" arrow>
            연결하기
          </Button>

          <InfoNotice>
            Outlook · Hotmail은 Microsoft 정책으로{' '}
            <strong className="font-bold text-[#455269]">
              아직 연결할 수 없어요.
            </strong>
          </InfoNotice>
        </form>
      </div>
    </main>
  )
}

export default Step2CustomPage

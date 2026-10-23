export type MailGuideStep = {
  text: string
  sub?: string
  href?: string
}

export type MailProviderGuide = {
  id: 'gmail' | 'naver'
  title: string
  steps: MailGuideStep[]
  passwordLabel: { main: string; sub?: string }
  passwordMaxLength?: number
  normalizePassword?: (value: string) => string
}

const gmail: MailProviderGuide = {
  id: 'gmail',
  title: 'Gmail은 앱 비밀번호가 필요해요',
  steps: [
    {
      text: 'Google 계정에서 2단계 인증 켜기',
      href: 'https://myaccount.google.com/signinoptions/two-step-verification',
    },
    {
      text: '앱 비밀번호 만들기',
      sub: '(이름: IDly)',
      href: 'https://myaccount.google.com/apppasswords',
    },
    { text: '16자리를 복사해 아래에 붙여넣기' },
  ],
  passwordLabel: { main: '앱 비밀번호 16자리' },
  passwordMaxLength: 16,
  // Google은 앱 비밀번호를 "abcd efgh ijkl mnop"처럼 띄어서 보여줘요
  normalizePassword: (value) => value.replace(/\s/g, ''),
}

const naver: MailProviderGuide = {
  id: 'naver',
  title: '네이버 메일은 IMAP을 켜야 해요',
  steps: [
    {
      text: '네이버 메일 환경설정 → IMAP/SMTP 사용함',
      // 네이버 메일 메인 (환경설정 버튼이 보이는 화면)
      href: 'https://mail.naver.com/',
    },
    {
      text: '2단계 인증을 쓰면 애플리케이션 비밀번호 만들기',
      // 네이버ID 내정보 > 보안설정
      href: 'https://nid.naver.com/user2/help/myInfoV2?m=viewSecurity&lang=ko_KR',
    },
    { text: '비밀번호를 아래에 붙여넣기' },
  ],
  passwordLabel: {
    main: '비밀번호',
    sub: '(2단계 인증이면 애플리케이션 비밀번호)',
  },
}

const guidesByDomain: Record<string, MailProviderGuide> = {
  'gmail.com': gmail,
  'googlemail.com': gmail,
  'naver.com': naver,
}

export function getEmailDomain(email: string): string | null {
  const match = email.trim().match(/^[^\s@]+@([^\s@]+\.[^\s@]+)$/)
  return match ? match[1].toLowerCase() : null
}

export function getMailProviderGuide(domain: string): MailProviderGuide | null {
  return guidesByDomain[domain] ?? null
}

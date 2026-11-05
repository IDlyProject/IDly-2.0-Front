export type ConnectedMailbox = {
  email: string
  initial: string
  lastAnalyzed: string | null
  accountCount: number
  errorMessage: string | null
}

// TODO: 메일 목록·내 정보 API 연동 후 제거
export const profileMock: {
  login: { provider: string; email: string }
  mailboxes: ConnectedMailbox[]
} = {
  login: { provider: 'Google', email: 'jihye.kim@gmail.com' },
  mailboxes: [
    {
      email: 'jihye.kim@gmail.com',
      initial: 'G',
      lastAnalyzed: '오늘 00:00',
      accountCount: 41,
      errorMessage: null,
    },
    {
      email: 'jihye@naver.com',
      initial: 'N',
      lastAnalyzed: null,
      accountCount: 11,
      errorMessage: '앱 비밀번호 오류로 분석하지 못했어요',
    },
  ],
}

import type { HomeSummary } from './types.ts'

const GMAIL = 'jihye.kim@gmail.com'
const NAVER = 'jihye@naver.com'

// TODO: 홈 API 연동 후 제거
export const homeMock: HomeSummary = {
  userName: '지혜',
  monthlySubscriptionCost: 47280,
  dailyCheckText: '매일 00시에 메일 2개를 새로 확인해요',
  totalMailCount: 52,
  mailboxes: [
    { email: GMAIL, provider: 'gmail', count: 41 },
    { email: NAVER, provider: 'naver', count: 11 },
  ],
  pendingTask: { title: '쿠팡 해지에 로그인이 필요해요' },
  favorites: [
    {
      id: 'coupang',
      name: '쿠팡',
      service: 'coupang',
      mailbox: GMAIL,
      dot: 'blue',
      description: '어제 사용 · 월 7,890원',
    },
    {
      id: 'naver',
      name: '네이버',
      service: 'naver',
      mailbox: NAVER,
      dot: 'green',
      description: '오늘 로그인 · 보안 알림 1건',
    },
    {
      id: 'notion',
      name: 'Notion',
      service: 'notion',
      mailbox: GMAIL,
      dot: 'blue',
      description: '연 134,400원 · 2027년 3월 갱신',
    },
  ],
  subscriptions: [
    {
      id: 'youtube',
      name: '유튜브 프리미엄',
      service: 'youtube',
      mailbox: GMAIL,
      dot: 'blue',
      description: '3개월째 안 씀',
      price: '14,900원',
    },
    {
      id: 'figma',
      name: 'Figma',
      service: 'figma',
      mailbox: GMAIL,
      dot: 'blue',
      description: '10월 18일 결제',
      price: '24,490원',
    },
    {
      id: 'coupang-wow',
      name: '쿠팡 와우',
      service: 'coupang',
      mailbox: GMAIL,
      dot: 'blue',
      description: '10월 14일 결제',
      price: '7,890원',
    },
    {
      id: 'naver-plus',
      name: '네이버플러스 멤버십',
      service: 'naver',
      mailbox: NAVER,
      dot: 'blue',
      description: '10월 25일 결제',
      price: '4,900원',
    },
  ],
  securityAlerts: [
    {
      id: 'naver',
      name: '네이버',
      service: 'naver',
      mailbox: NAVER,
      dot: 'green',
      description: '9월 27일 새 기기 로그인',
    },
    {
      id: 'toss',
      name: '토스',
      service: 'toss',
      mailbox: GMAIL,
      dot: 'orange',
      description: '의심스러운 로그인 시도 2번',
    },
  ],
  dormant: {
    count: 17,
    examples: '아놀자 · 29CM · 위메프 외',
    recommendedCount: 3,
  },
}

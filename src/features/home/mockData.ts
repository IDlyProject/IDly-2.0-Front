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
      detail: {
        billing: {
          amount: '14,900원',
          nextBillingDate: '10월 3일',
          note: '최근 3개월 미사용',
        },
        canCancelSubscription: true,
        totalMailCount: 5,
        records: [
          {
            date: '9월 3일',
            kind: 'payment',
            title: 'YouTube Premium 결제 영수증',
            amount: '₩14,900',
          },
          {
            date: '8월 3일',
            kind: 'payment',
            title: 'YouTube Premium 결제 영수증',
            amount: '₩14,900',
          },
          {
            date: '7월 3일',
            kind: 'payment',
            title: 'YouTube Premium 결제 영수증',
            amount: '₩14,900',
          },
          {
            date: '6월 12일',
            kind: 'login',
            title: '새 기기에서 로그인했습니다',
            caption: '로그인 활동 메일',
          },
          {
            date: '2022.01.05',
            kind: 'signup',
            title: 'YouTube Premium에 오신 것을 환영합니다',
          },
        ],
      },
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

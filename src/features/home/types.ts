export type ServiceKey =
  'coupang' | 'naver' | 'notion' | 'youtube' | 'figma' | 'toss'

export type StatusDot = 'blue' | 'green' | 'orange'

export type ServiceItem = {
  id: string
  name: string
  service: ServiceKey
  mailbox: string
  dot: StatusDot
  description: string
  price?: string
}

export type HomeMailbox = {
  email: string
  provider: 'gmail' | 'naver'
  count: number
}

export type HomeSummary = {
  userName: string
  monthlySubscriptionCost: number
  dailyCheckText: string
  totalMailCount: number
  mailboxes: HomeMailbox[]
  pendingTask: { title: string } | null
  favorites: ServiceItem[]
  subscriptions: ServiceItem[]
  securityAlerts: ServiceItem[]
  dormant: { count: number; examples: string; recommendedCount: number }
}

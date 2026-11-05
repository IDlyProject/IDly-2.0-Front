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
  detail?: ServiceDetail
  securityAlert?: SecurityAlertDetail
}

export type SecurityAction = {
  id: string
  title: string
  description: string
}

export type SecurityAlertDetail = {
  title: string
  actions: SecurityAction[]
  records: { date: string; title: string }[]
}

export type MailRecordKind = 'payment' | 'login' | 'signup'

export type MailRecord = {
  date: string
  kind: MailRecordKind
  title: string
  amount?: string
  caption?: string
}

export type ServiceDetail = {
  billing?: {
    amount: string
    nextBillingDate: string
    note: string
  }
  canCancelSubscription: boolean
  records: MailRecord[]
  totalMailCount: number
}

export type HomeMailbox = {
  email: string
  provider: 'gmail' | 'naver' | 'other'
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

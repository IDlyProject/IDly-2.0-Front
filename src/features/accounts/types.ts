export type AccountCategory =
  'all' | 'favorites' | 'subscriptions' | 'security' | 'dormant' | 'hidden'

export type AccountTone = 'neutral' | 'warning' | 'danger'

export type AccountTag = { label: string; tone: AccountTone }

export type AccountEntry = {
  id: string
  name: string
  initial: string
  mailbox: string
  favorite: boolean
  tone: Exclude<AccountTone, 'danger'>
  needsAttention: boolean
  tags: AccountTag[]
  subscription?: boolean
  securityAlert?: boolean
  dormant?: boolean
  hidden?: boolean
}

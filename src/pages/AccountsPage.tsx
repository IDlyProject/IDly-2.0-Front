import { useState } from 'react'
import { useSearchParams } from 'react-router'
import AccountRow from '@/features/accounts/components/AccountRow.tsx'
import { accountsMock } from '@/features/accounts/mockData.ts'
import type {
  AccountCategory,
  AccountEntry,
} from '@/features/accounts/types.ts'
import HomeHeader from '@/features/home/components/HomeHeader.tsx'
import { homeMock } from '@/features/home/mockData.ts'
import searchIcon from '@/shared/assets/icons/search-small.svg'
import { cn } from '@/shared/lib/cn.ts'

const categories: {
  key: AccountCategory
  label: string
  countClass: string
}[] = [
  { key: 'all', label: '전체', countClass: 'text-[#202f61]' },
  { key: 'favorites', label: '★ 즐겨찾기', countClass: 'text-[#202f61]' },
  { key: 'subscriptions', label: '구독', countClass: 'text-[#202f61]' },
  { key: 'security', label: '보안 알림', countClass: 'text-[#ee4e4e]' },
  { key: 'dormant', label: '안 쓰는 계정', countClass: 'text-[#c4631a]' },
  { key: 'hidden', label: '숨긴 계정', countClass: 'text-[#202f61]' },
]

const isCategory = (value: string | null): value is AccountCategory =>
  categories.some((category) => category.key === value)

const chipClass = (selected: boolean) =>
  cn(
    'flex items-center gap-2 rounded-full border px-4 font-semibold whitespace-nowrap',
    selected
      ? 'border-[#202f61] bg-[#202f61] text-white'
      : 'border-[#e6e8f1] bg-white text-[#5a6690]',
  )

function AccountsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')
  const category: AccountCategory = isCategory(categoryParam)
    ? categoryParam
    : 'all'
  const mailbox = searchParams.get('mailbox')

  const [query, setQuery] = useState('')
  const [favoriteIds, setFavoriteIds] = useState(() =>
    accountsMock.filter((a) => a.favorite).map((a) => a.id),
  )
  const toggleFavorite = (id: string) =>
    setFavoriteIds((ids) =>
      ids.includes(id) ? ids.filter((v) => v !== id) : [...ids, id],
    )

  const updateParams = (next: {
    mailbox?: string | null
    category?: AccountCategory
  }) => {
    const params = new URLSearchParams(searchParams)
    if (next.mailbox !== undefined) {
      if (next.mailbox) params.set('mailbox', next.mailbox)
      else params.delete('mailbox')
    }
    if (next.category !== undefined) {
      if (next.category === 'all') params.delete('category')
      else params.set('category', next.category)
    }
    setSearchParams(params, { replace: true })
  }

  const matchesCategory = (account: AccountEntry, key: AccountCategory) => {
    switch (key) {
      case 'all':
        return !account.hidden
      case 'favorites':
        return !account.hidden && favoriteIds.includes(account.id)
      case 'subscriptions':
        return !account.hidden && !!account.subscription
      case 'security':
        return !account.hidden && !!account.securityAlert
      case 'dormant':
        return !account.hidden && !!account.dormant
      case 'hidden':
        return !!account.hidden
    }
  }

  const inMailbox = accountsMock.filter(
    (account) => !mailbox || account.mailbox === mailbox,
  )
  const keyword = query.trim().toLowerCase()
  const visible = inMailbox.filter(
    (account) =>
      matchesCategory(account, category) &&
      (!keyword || account.name.toLowerCase().includes(keyword)),
  )
  const totalCount = accountsMock.filter((account) => !account.hidden).length

  return (
    <div className="min-h-screen bg-[#f9f9fd] pb-20">
      <HomeHeader userInitial={homeMock.userName.charAt(0)} />

      <section className="mt-[31px] h-[200px] bg-[#202f61] px-6">
        <div className="relative mx-auto h-full max-w-[1120px] py-10">
          <h1 className="text-[40px] leading-[52.8px] font-extrabold tracking-[-1.54px] text-white">
            내 계정 <span className="text-[#ff9b54]">{totalCount}개</span>
          </h1>
          <label className="absolute bottom-[31px] left-0 flex h-14 w-[560px] max-w-full items-center gap-3 rounded-2xl bg-white px-5 drop-shadow-[0px_10px_14px_rgba(32,47,97,0.22)]">
            <img src={searchIcon} alt="" width={20} height={20} />
            <input
              type="search"
              aria-label="서비스 이름으로 찾기"
              placeholder="검색"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-base leading-normal text-[#202f61] outline-none placeholder:text-[#9aa2bf]"
            />
          </label>
        </div>
      </section>

      <div className="mx-auto max-w-[1168px] px-6">
        <div className="mt-[37px] flex flex-wrap gap-2 text-sm leading-normal">
          <button
            type="button"
            aria-pressed={!mailbox}
            onClick={() => updateParams({ mailbox: null })}
            className={cn('h-10', chipClass(!mailbox))}
          >
            모든 메일
          </button>
          {homeMock.mailboxes.map(({ email }) => {
            const selected = mailbox === email
            const count = accountsMock.filter(
              (account) => !account.hidden && account.mailbox === email,
            ).length
            return (
              <button
                key={email}
                type="button"
                aria-pressed={selected}
                onClick={() => updateParams({ mailbox: email })}
                className={cn('h-10', chipClass(selected))}
              >
                {email}
                <span
                  className={cn(
                    'font-bold',
                    selected ? 'text-white' : 'text-[#202f61]',
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-[13.5px] leading-normal">
          {categories.map(({ key, label, countClass }) => {
            const selected = category === key
            const count = inMailbox.filter((account) =>
              matchesCategory(account, key),
            ).length
            return (
              <button
                key={key}
                type="button"
                aria-pressed={selected}
                onClick={() => updateParams({ category: key })}
                className={cn('h-9', chipClass(selected))}
              >
                {label}
                <span
                  className={cn(
                    'font-bold',
                    selected ? 'text-[#ff9b54]' : countClass,
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <section className="mt-[22px] overflow-hidden rounded-3xl border border-[#e6e8f1] bg-white pt-3 shadow-[0px_2px_0px_0px_rgba(32,47,97,0.04)]">
          {visible.length > 0 ? (
            <ul>
              {visible.map((account) => (
                <AccountRow
                  key={account.id}
                  account={account}
                  favorite={favoriteIds.includes(account.id)}
                  onToggleFavorite={() => toggleFavorite(account.id)}
                />
              ))}
            </ul>
          ) : (
            <p className="py-16 text-center text-base text-[#9aa0b4]">
              해당하는 계정이 없어요
            </p>
          )}
        </section>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 h-[52px] bg-[rgba(246,246,246,0.2)] backdrop-blur-[2px]" />
    </div>
  )
}

export default AccountsPage

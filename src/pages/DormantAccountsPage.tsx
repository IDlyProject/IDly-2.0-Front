import { useState } from 'react'
import { useSearchParams } from 'react-router'
import HomeHeader from '@/features/home/components/HomeHeader.tsx'
import { homeMock } from '@/features/home/mockData.ts'
import {
  dormantAccountsMock,
  type DormantAccount,
} from '@/features/dormant/mockData.ts'
import checkIcon from '@/shared/assets/icons/check-on.svg'
import chevronRight from '@/shared/assets/icons/chevron-right.svg'
import { cn } from '@/shared/lib/cn.ts'

const tagClass =
  'rounded-[7px] px-2 py-[3px] font-semibold whitespace-nowrap bg-[#e9ecf5] text-[#202f61]'

function DormantRow({
  account,
  checked,
  onToggle,
}: {
  account: DormantAccount
  checked: boolean
  onToggle: () => void
}) {
  return (
    <li className="flex h-[72px] items-center gap-4 border-b border-[#e6e8f1] px-6 last:border-b-0">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-label={`${account.name} 선택`}
        disabled={!account.agentSupported}
        onClick={onToggle}
        className={cn(
          'flex size-[26px] shrink-0 items-center justify-center rounded-[13px] border-2 disabled:cursor-not-allowed',
          checked
            ? 'border-[#202f61] bg-[#202f61]'
            : 'border-[#c3c8dc] bg-white',
        )}
      >
        {checked && <img src={checkIcon} alt="" width={14} height={14} />}
      </button>
      <span
        className={cn(
          'flex size-11 shrink-0 items-center justify-center rounded-[13px] bg-[#e9ecf5] text-[17px] leading-normal font-extrabold tracking-[-0.16px]',
          checked ? 'text-[#2d3b6a]' : 'text-[#202f61]',
        )}
      >
        {account.initial}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-[5px]">
        <p className="truncate text-[17px] leading-normal font-bold tracking-[-0.34px] text-[#202f61]">
          {account.name}
        </p>
        <div className="flex items-center gap-1.5 overflow-hidden text-[12.5px] leading-normal tracking-[-0.16px]">
          {account.agentSupported ? (
            <>
              {account.note && <span className={tagClass}>{account.note}</span>}
              <span className={tagClass}>
                마지막 로그인 {account.lastLogin}
              </span>
            </>
          ) : (
            <>
              <span className="rounded-[7px] bg-[#fec3c3] px-2 py-[3px] font-semibold whitespace-nowrap text-[#ee4e4e]">
                직접 해야 해요 (에이전트 미지원)
              </span>
              <button
                type="button"
                className="font-semibold whitespace-nowrap text-[#202f61] underline"
              >
                방법 보기
              </button>
            </>
          )}
          <span className="py-[3px] pl-1 font-medium whitespace-nowrap text-[#5a6690]">
            {account.mailbox}
          </span>
        </div>
      </div>
      <img src={chevronRight} alt="" width={20} height={20} />
    </li>
  )
}

function DormantAccountsPage() {
  const [searchParams] = useSearchParams()
  const [selectedIds, setSelectedIds] = useState<string[]>(() =>
    searchParams.get('select') === 'recommended'
      ? dormantAccountsMock.filter((a) => a.recommended).map((a) => a.id)
      : [],
  )
  const toggle = (id: string) =>
    setSelectedIds((ids) =>
      ids.includes(id) ? ids.filter((v) => v !== id) : [...ids, id],
    )
  const count = selectedIds.length

  return (
    <div className="min-h-screen bg-[#f9f9fd] pb-[52px]">
      <HomeHeader userInitial={homeMock.userName.charAt(0)} />

      <section className="mt-[31px] h-[200px] bg-[#202f61] px-6">
        <div className="mx-auto max-w-[1120px] pt-[49px] pb-10 tracking-[-1.54px] text-white">
          <h1 className="text-[40px] leading-[52.8px] font-extrabold">
            {dormantAccountsMock.length}개의 비활성 계정
          </h1>
          <p className="text-[21px] leading-[52.8px]">
            1년 이상 사용하지 않은 계정이에요.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1168px] px-6">
        <ul className="mt-[42px] overflow-hidden rounded-3xl border border-[#e6e8f1] bg-white shadow-[0px_10px_28px_0px_rgba(32,47,97,0.14)]">
          {dormantAccountsMock.map((account) => (
            <DormantRow
              key={account.id}
              account={account}
              checked={selectedIds.includes(account.id)}
              onToggle={() => toggle(account.id)}
            />
          ))}
        </ul>

        <div className="sticky bottom-[68px] mt-[46px] flex justify-center">
          <button
            type="button"
            disabled={count === 0}
            className="flex h-[73px] w-[340px] max-w-full flex-col items-center justify-center rounded-[14px] bg-[#202f61] px-7 text-center leading-5 font-bold disabled:cursor-not-allowed"
          >
            {count > 0 ? (
              <>
                <span className="text-xl text-[#f69340]">
                  {count}개 탈퇴 맡기기
                </span>
                <span className="text-xs font-normal text-white">
                  끝나면 이용권 {count}회 차감
                </span>
              </>
            ) : (
              <span className="text-base text-white/60">
                탈퇴할 계정을 골라주세요
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 h-[52px] bg-[rgba(246,246,246,0.2)] backdrop-blur-[2px]" />
    </div>
  )
}

export default DormantAccountsPage

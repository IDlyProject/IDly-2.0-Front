import chevronRight from '@/shared/assets/icons/chevron-right.svg'
import starFilled from '@/shared/assets/icons/star-filled.svg'
import starOutline from '@/shared/assets/icons/star-outline.svg'
import { cn } from '@/shared/lib/cn.ts'
import type { AccountEntry, AccountTone } from '../types.ts'

const toneClass: Record<AccountTone, string> = {
  neutral: 'bg-[#e9ecf5] text-[#202f61]',
  warning: 'bg-[#ffeedf] text-[#c4631a]',
  danger: 'bg-[#fec3c3] text-[#ee4e4e]',
}

type AccountRowProps = {
  account: AccountEntry
  favorite: boolean
  onToggleFavorite: () => void
}

function AccountRow({ account, favorite, onToggleFavorite }: AccountRowProps) {
  return (
    <li className="relative flex h-20 items-center gap-4 border-b border-[#e6e8f1] pr-6 pl-5 last:border-b-0">
      {account.needsAttention && (
        <span className="absolute top-[18px] bottom-[18px] left-0 w-1 rounded-r bg-[#ff9b54]" />
      )}
      <button
        type="button"
        aria-pressed={favorite}
        aria-label={favorite ? '즐겨찾기 해제' : '즐겨찾기'}
        onClick={onToggleFavorite}
        className="flex size-8 shrink-0 items-center justify-center rounded-2xl"
      >
        <img
          src={favorite ? starFilled : starOutline}
          alt=""
          width={20}
          height={20}
        />
      </button>
      <span
        className={cn(
          'flex size-12 shrink-0 items-center justify-center rounded-[14px] text-lg leading-normal font-extrabold tracking-[-0.16px]',
          toneClass[account.tone],
        )}
      >
        {account.initial}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <p className="truncate text-[17px] leading-normal font-bold tracking-[-0.34px] text-[#202f61]">
          {account.name}
        </p>
        <div className="flex flex-wrap items-center gap-1.5 text-[12.5px] leading-normal tracking-[-0.16px]">
          {account.tags.map((tag) => (
            <span
              key={tag.label}
              className={cn(
                'rounded-[7px] px-2 py-[3px] font-semibold whitespace-nowrap',
                toneClass[tag.tone],
              )}
            >
              {tag.label}
            </span>
          ))}
          <span className="py-[3px] pl-1 font-medium whitespace-nowrap text-[#5a6690]">
            {account.mailbox}
          </span>
        </div>
      </div>
      <img src={chevronRight} alt="" width={20} height={20} />
    </li>
  )
}

export default AccountRow

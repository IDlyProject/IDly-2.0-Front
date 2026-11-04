import bellIcon from '@/shared/assets/icons/bell.svg'
import searchIcon from '@/shared/assets/icons/search.svg'
import logo from '@/shared/assets/images/home/logo-check.svg'
import { cn } from '@/shared/lib/cn.ts'

const tabs = [
  { label: '홈', active: true },
  { label: '에이전트 작업', active: false },
]

function HomeHeader({ userInitial }: { userInitial: string }) {
  return (
    <header className="relative flex items-center pt-[22px] pr-[35px] pl-[67px]">
      <img src={logo} alt="" width={49} height={49} className="mt-0.5" />
      <nav className="ml-[23px] flex h-[50px] flex-1 items-center gap-3.5">
        <span className="pr-3 pb-px text-[32px] leading-normal font-bold tracking-[-1px] text-[#141c3a]">
          IDly
        </span>
        {tabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            aria-current={tab.active ? 'page' : undefined}
            className={cn(
              'flex h-[46px] shrink-0 items-center rounded-[23px] text-lg leading-normal',
              tab.active
                ? 'bg-[#e9ebf3] px-[29px] text-[#141c3a]'
                : 'px-3 text-[#5b6280]',
            )}
          >
            {tab.label}
          </button>
        ))}

        <label className="ml-auto flex h-[50px] w-full max-w-[290px] min-w-[160px] items-center gap-3 rounded-[25px] bg-[#eff0f6] px-[18px]">
          <img src={searchIcon} alt="" width={22} height={22} />
          <input
            type="search"
            placeholder="검색"
            className="min-w-0 flex-1 bg-transparent pt-px pb-[3px] text-base leading-normal text-[#141c3a] outline-none placeholder:text-[#9aa0b4]"
          />
        </label>
        <button
          type="button"
          aria-label="알림"
          className="flex size-[50px] items-center justify-center rounded-[25px] bg-[#eff0f6]"
        >
          <img src={bellIcon} alt="" width={24} height={24} />
        </button>
        <button
          type="button"
          aria-label="내 정보"
          className="flex size-[50px] items-center justify-center rounded-[25px] bg-[#eff0f6] text-[17px] leading-normal text-[#5b6280]"
        >
          {userInitial}
        </button>
      </nav>
    </header>
  )
}

export default HomeHeader

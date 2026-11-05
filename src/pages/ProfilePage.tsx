import { useNavigate } from 'react-router'
import { logout } from '@/features/auth/api.ts'
import HomeHeader from '@/features/home/components/HomeHeader.tsx'
import { homeMock } from '@/features/home/mockData.ts'
import { profileMock } from '@/features/profile/mockData.ts'
import { cn } from '@/shared/lib/cn.ts'

const cardClass =
  'mx-auto w-full max-w-[968px] rounded-[28px] border border-[#eef0f6] bg-white drop-shadow-[0px_10px_18px_rgba(32,47,97,0.1)]'
const tagClass =
  'rounded-lg px-2.5 py-1 text-[13px] leading-normal tracking-[-0.16px] whitespace-nowrap'
const neutralTag = cn(tagClass, 'bg-[#eef0f7] font-semibold text-[#202f61]')

function ProfilePage() {
  const navigate = useNavigate()
  const { login, mailboxes } = profileMock

  const handleLogout = async () => {
    await logout()
    navigate('/onboarding', { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#f9f9fd] pb-[52px]">
      <HomeHeader userInitial={homeMock.userName.charAt(0)} />

      <section className="mt-[31px] min-h-[200px] bg-[#202f61] px-6">
        <div className="mx-auto max-w-[1120px] pt-[49px] pb-10 tracking-[-1.54px] text-white">
          <h1 className="text-[40px] leading-[52.8px] font-extrabold">
            연결된 메일{' '}
            <span className="text-[#f69340]">{mailboxes.length}개</span>
          </h1>
          <p className="text-xl leading-[52.8px]">
            로그인 계정 하나에 메일을 여러 개 연결할 수 있어요. 메일마다 찾은
            계정은 홈에 한꺼번에 모이고, 이용권은 함께 써요.
          </p>
        </div>
      </section>

      <div className="px-6">
        <section
          aria-label="연결된 메일 목록"
          className={cn(cardClass, 'mt-10 py-2')}
        >
          <ul>
            {mailboxes.map((mailbox) => (
              <li
                key={mailbox.email}
                className="flex items-center gap-[18px] border-b border-[#f0f2f7] px-9 py-5"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-[#eef0f7] text-lg leading-normal font-extrabold tracking-[-0.16px] text-[#202f61]">
                  {mailbox.initial}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <strong className="truncate text-lg leading-normal font-bold tracking-[-0.16px] text-[#1b2038]">
                    {mailbox.email}
                  </strong>
                  <div className="flex flex-wrap gap-1.5">
                    {mailbox.errorMessage ? (
                      <span
                        className={cn(
                          tagClass,
                          'bg-[#fff1e6] font-bold text-[#b85a12]',
                        )}
                      >
                        {mailbox.errorMessage}
                      </span>
                    ) : (
                      <>
                        {mailbox.lastAnalyzed && (
                          <span className={neutralTag}>
                            {mailbox.lastAnalyzed} 분석
                          </span>
                        )}
                        <span className={neutralTag}>
                          계정 {mailbox.accountCount}개
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1.5 text-sm leading-normal">
                  <button
                    type="button"
                    className={cn(
                      'h-[42px] rounded-xl px-5 font-bold',
                      mailbox.errorMessage
                        ? 'bg-[#202f61] text-white'
                        : 'bg-[#eef0f7] text-[#202f61]',
                    )}
                  >
                    다시 연결
                  </button>
                  <button
                    type="button"
                    className="px-3 py-2.5 font-medium text-[#7a8099]"
                  >
                    빼기
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => navigate('/onboarding/mail/add')}
            className="flex w-full items-center gap-[18px] px-9 py-5 text-left"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] border border-dashed border-[#bfc5d9] bg-white text-[22px] leading-normal font-medium text-[#7a8099]">
              +
            </span>
            <span className="text-[17px] leading-normal font-bold text-[#202f61]">
              메일 추가하기
            </span>
          </button>
        </section>

        <section
          aria-label="IDly 로그인 계정"
          className={cn(
            cardClass,
            'mt-[50px] flex items-center gap-[18px] px-9 pt-7 pb-[26px]',
          )}
        >
          <div className="flex min-w-0 flex-1 flex-col gap-1 tracking-[-0.16px]">
            <p className="text-[13.5px] leading-normal text-[#7a8099]">
              IDly 로그인 계정 · 연결된 메일과는 따로 관리돼요
            </p>
            <strong className="truncate text-[19px] leading-normal font-bold text-[#1b2038]">
              {login.provider} · {login.email}
            </strong>
          </div>
          <div className="flex shrink-0 items-center gap-2 text-sm leading-normal">
            <button
              type="button"
              onClick={handleLogout}
              className="h-[42px] rounded-xl border border-[#e3e6ef] bg-white px-5 font-bold text-[#202f61]"
            >
              로그아웃
            </button>
            <button
              type="button"
              className="px-3 py-[13px] font-medium text-[#7a8099]"
            >
              IDly 탈퇴
            </button>
          </div>
        </section>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 h-[52px] bg-[rgba(246,246,246,0.2)] backdrop-blur-[2px]" />
    </div>
  )
}

export default ProfilePage

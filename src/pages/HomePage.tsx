import { useState } from 'react'
import { useNavigate } from 'react-router'
import HomeHeader from '@/features/home/components/HomeHeader.tsx'
import ServiceCard from '@/features/home/components/ServiceCard.tsx'
import AccountPanelContent from '@/features/home/components/AccountPanelContent.tsx'
import SecurityAlertPanelContent from '@/features/home/components/SecurityAlertPanelContent.tsx'
import ServicePanel, {
  PANEL_CLOSE_DURATION,
} from '@/features/home/components/ServicePanel.tsx'
import { homeMock } from '@/features/home/mockData.ts'
import type { ServiceItem } from '@/features/home/types.ts'
import heroBackground from '@/shared/assets/images/home/hero-background.svg'
import bannerMascot from '@/shared/assets/images/home/banner-mascot.svg'
import bannerShadow from '@/shared/assets/images/home/banner-shadow.svg'

const chipBase =
  'flex h-[46px] items-center rounded-[23px] px-5 text-[17px] leading-normal'
const chipShadow = 'drop-shadow-[0px_2px_5px_rgba(30,40,90,0.06)]'

type OpenedService = { item: ServiceItem; anchor: HTMLElement; seq: number }

function HomePage() {
  const navigate = useNavigate()
  const data = homeMock
  const [selectedMailbox, setSelectedMailbox] = useState<string | null>(null)
  const [openedService, setOpenedService] = useState<OpenedService | null>(null)
  const openService = (item: ServiceItem, anchor: HTMLElement) =>
    setOpenedService((current) =>
      current?.anchor === anchor
        ? current
        : { item, anchor, seq: (current?.seq ?? 0) + 1 },
    )
  const closeService = (seq: number) =>
    setOpenedService((current) => (current?.seq === seq ? null : current))
  const selectMailbox = (email: string | null) => {
    setOpenedService(null)
    setSelectedMailbox(email)
  }

  const [favoriteIds, setFavoriteIds] = useState(() =>
    data.favorites.map((item) => item.id),
  )
  const toggleFavorite = (id: string) =>
    setFavoriteIds((ids) =>
      ids.includes(id) ? ids.filter((v) => v !== id) : [...ids, id],
    )

  const [dismissedAlertIds, setDismissedAlertIds] = useState<string[]>([])
  const dismissAlert = (id: string) =>
    setDismissedAlertIds((ids) => [...ids, id])

  const allServices = [
    ...data.favorites,
    ...data.subscriptions,
    ...data.securityAlerts,
  ]
  const favoriteItems = favoriteIds.flatMap((id) => {
    const item = allServices.find((service) => service.id === id)
    return item ? [item] : []
  })

  const byMailbox = (items: ServiceItem[]) =>
    selectedMailbox
      ? items.filter((item) => item.mailbox === selectedMailbox)
      : items
  const favorites = byMailbox(favoriteItems)
  const subscriptions = byMailbox(data.subscriptions)
  const activeAlerts = data.securityAlerts.filter(
    (item) => !dismissedAlertIds.includes(item.id),
  )
  const securityAlerts = byMailbox(activeAlerts)
  const openedAlert = openedService
    ? activeAlerts.find((alert) => alert.id === openedService.item.id)
        ?.securityAlert
    : undefined

  const chipState = (selected: boolean) =>
    selected ? 'bg-[#141c3a] font-bold text-white' : 'bg-white text-[#3a4160]'

  return (
    <div className="min-h-screen overflow-x-clip bg-linear-to-b from-[#fbfbfe] to-[#f3f4fa] pb-[18px]">
      <HomeHeader userInitial={data.userName.charAt(0)} />

      <main className="relative mx-auto w-full max-w-[1303px] px-6 pt-[60px]">
        <img
          src={heroBackground}
          alt=""
          width={1586}
          height={317}
          className="pointer-events-none absolute top-0 left-[-81px] hidden max-w-none lg:block"
        />

        <section className="relative pl-[7px]">
          <h1 className="text-[34px] leading-[51px] font-bold tracking-[-1.5px] text-[#141c3a]">
            {data.userName} 님, 매달{' '}
            <span className="text-[#f26a1b]">
              {data.monthlySubscriptionCost.toLocaleString('ko-KR')}원
            </span>
            이
            <br />
            구독으로 나가고 있어요
          </h1>
          <p className="mt-[7px] text-[19px] leading-normal text-[#80869c]">
            {data.dailyCheckText}
          </p>
        </section>

        <div className="relative mt-[44px] -ml-[13px] flex flex-wrap items-start gap-3.5">
          <button
            type="button"
            aria-pressed={selectedMailbox === null}
            onClick={() => selectMailbox(null)}
            className={`${chipBase} ${chipShadow} ${chipState(selectedMailbox === null)}`}
          >
            모든 메일 {data.totalMailCount}
          </button>
          {data.mailboxes.map((mailbox) => {
            const selected = selectedMailbox === mailbox.email
            return (
              <button
                key={mailbox.email}
                type="button"
                aria-pressed={selected}
                onClick={() => selectMailbox(mailbox.email)}
                className={`${chipBase} ${chipShadow} gap-2.5 ${chipState(selected)}`}
              >
                {mailbox.provider === 'gmail' ? (
                  <span className="flex size-[22px] items-center justify-center rounded-md border border-[#eee] bg-white text-[13px] leading-normal font-bold text-[#ea4335]">
                    M
                  </span>
                ) : (
                  <span className="flex size-[22px] items-center justify-center rounded-[11px] bg-[#1fc16b] text-[13px] leading-normal font-bold text-white">
                    N
                  </span>
                )}
                {mailbox.email}
                <span
                  className={`pb-px ${selected ? 'text-white/70' : 'text-[#5b6280]'}`}
                >
                  {mailbox.count}
                </span>
              </button>
            )
          })}
          <button
            type="button"
            onClick={() => navigate('/onboarding/mail/add')}
            className={`${chipBase} border border-dashed border-[#c6cadb] text-[#5b6280]`}
          >
            + 메일 추가
          </button>
        </div>

        {data.pendingTask && (
          <button
            type="button"
            className="mt-[30px] flex h-[68px] w-full items-center rounded-[20px] bg-white px-7 text-left drop-shadow-[0px_4px_10px_rgba(30,40,90,0.07)]"
          >
            <span className="mr-[22px] flex size-[38px] items-center justify-center rounded-[19px] bg-[#ffd9b8] pt-[7.5px] pb-[8.5px] text-xl leading-normal font-bold text-[#f26a1b]">
              !
            </span>
            <span className="min-w-0 truncate pt-0.5 pb-[3px] text-[19px] leading-normal font-semibold text-[#141c3a]">
              {data.pendingTask.title}
            </span>
            <span className="ml-auto shrink-0 pt-0.5 pb-[3px] pl-6 text-[19px] leading-normal font-semibold text-[#f26a1b]">
              이어가기 ›
            </span>
          </button>
        )}

        <div className="mt-[17px] mr-1.5 ml-0.5 grid grid-cols-1 gap-[26px] lg:grid-cols-3">
          <ServiceCard
            title={
              <>
                <span className="pt-0.5 pb-[3px]">★</span>
                즐겨찾기 {favorites.length}
              </>
            }
            items={favorites}
            onSelect={openService}
          />
          <ServiceCard
            title={`구독 ${subscriptions.length}개`}
            items={subscriptions}
            onSelect={openService}
          />
          <ServiceCard
            title={`보안 알림 ${securityAlerts.length}건`}
            items={securityAlerts}
            onSelect={openService}
          />
        </div>

        <section className="relative mt-[17px] mr-1.5 ml-0.5 flex h-[86px] items-center rounded-3xl bg-linear-to-r from-[#fff6ec] to-white to-30% pl-[208px] drop-shadow-[0px_4px_10px_rgba(30,40,90,0.06)]">
          <img
            src={bannerShadow}
            alt=""
            width={75}
            height={18}
            className="absolute top-[58px] left-[67px]"
          />
          <img
            src={bannerMascot}
            alt=""
            width={78}
            height={62}
            className="absolute top-[10px] left-[76px]"
          />
          <div className="flex min-w-0 flex-col gap-1.5 self-start pt-5">
            <p className="truncate pt-0.5 pb-[3px] text-[17px] leading-normal font-bold text-[#141c3a]">
              1년 넘게 안 쓴 계정 {data.dormant.count}개
            </p>
            <p className="truncate pt-px pb-[3px] text-[15px] leading-normal text-[#80869c]">
              {data.dormant.examples} · 정리하면 개인정보도 줄어요
            </p>
          </div>
          <button
            type="button"
            className="mr-[20px] ml-auto flex h-14 shrink-0 items-center rounded-[28px] bg-[#ffe9d3] px-[26px] text-[17px] leading-normal font-bold text-[#f26a1b]"
          >
            추천 {data.dormant.recommendedCount}개 탈퇴 맡기기 ›
          </button>
          <button
            type="button"
            className="shrink-0 pr-7 pb-0.5 pl-[22px] text-[15px] leading-normal text-[#5b6280]"
          >
            전체 ›
          </button>
        </section>
      </main>

      {openedService && (
        <ServicePanel
          key={openedService.seq}
          label={`${openedService.item.name} 상세`}
          anchor={openedService.anchor}
          variant={openedAlert ? 'security' : 'account'}
          onClose={() => closeService(openedService.seq)}
        >
          {(close) => {
            const { item } = openedService
            const favorite = favoriteIds.includes(item.id)
            const onToggleFavorite = () => toggleFavorite(item.id)
            return openedAlert ? (
              <SecurityAlertPanelContent
                item={item}
                alert={openedAlert}
                favorite={favorite}
                onToggleFavorite={onToggleFavorite}
                onDismiss={() => {
                  close()
                  window.setTimeout(
                    () => dismissAlert(item.id),
                    PANEL_CLOSE_DURATION,
                  )
                }}
              />
            ) : (
              <AccountPanelContent
                item={item}
                favorite={favorite}
                onToggleFavorite={onToggleFavorite}
              />
            )
          }}
        </ServicePanel>
      )}
    </div>
  )
}

export default HomePage

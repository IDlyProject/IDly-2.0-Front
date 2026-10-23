import logo from '@/shared/assets/images/logo.svg'

function AppHeader() {
  return (
    <header className="flex w-full items-center gap-[21px] px-[60px] py-[22px]">
      <img src={logo} alt="" width={49} height={50} />
      <span className="text-[32px] leading-none font-bold tracking-[-1px] text-[#141c3a]">
        IDly
      </span>
    </header>
  )
}

export default AppHeader

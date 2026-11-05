import figmaIcon from '@/shared/assets/icons/figma.svg'
import youtubeIcon from '@/shared/assets/icons/youtube.svg'
import tossSprite from '@/shared/assets/images/home/toss-sprite.png'
import type { ServiceKey } from '../types.ts'

const circle =
  'flex size-[52px] shrink-0 items-center justify-center rounded-[26px] leading-normal font-bold'

function ServiceIcon({ service }: { service: ServiceKey }) {
  switch (service) {
    case 'coupang':
      return (
        <div
          className={`${circle} border border-[#eceef5] bg-white text-xs text-[#e4002b]`}
        >
          coupang
        </div>
      )
    case 'naver':
      return (
        <div className={`${circle} bg-[#1fc16b] text-[26px] text-white`}>N</div>
      )
    case 'notion':
      return (
        <div
          className={`${circle} border border-[#eceef5] bg-white text-2xl text-[#141c3a]`}
        >
          N
        </div>
      )
    case 'youtube':
      return (
        <div className={`${circle} bg-white`}>
          <img src={youtubeIcon} alt="" width={40} height={30} />
        </div>
      )
    case 'figma':
      return (
        <div className={`${circle} bg-white`}>
          <img src={figmaIcon} alt="" width={28} height={40} />
        </div>
      )
    case 'toss':
      return (
        <div className="relative h-[43px] w-[49px] shrink-0 overflow-hidden">
          <img
            src={tossSprite}
            alt=""
            className="absolute top-[-0.2%] left-0 h-[100.4%] w-[292.59%] max-w-none"
          />
        </div>
      )
  }
}

export default ServiceIcon

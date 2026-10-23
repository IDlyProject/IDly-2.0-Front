import type { MailGuideStep } from '@/features/onboarding/mailProviders.ts'

type GuideStepCardProps = {
  title: string
  steps: MailGuideStep[]
  variant?: 'gray' | 'blue'
}

function GuideStepCard({ variant = 'gray', ...props }: GuideStepCardProps) {
  return variant === 'blue' ? (
    <BlueGuideCard {...props} />
  ) : (
    <GrayGuideCard {...props} />
  )
}

type CardProps = Omit<GuideStepCardProps, 'variant'>

function GrayGuideCard({ title, steps }: CardProps) {
  return (
    <div className="border-line-card bg-surface-muted flex w-full flex-col gap-3.5 rounded-2xl border p-5 shadow-[inset_0px_1px_2px_0px_rgba(0,0,0,0.03)]">
      <div className="flex items-center gap-2">
        <span className="size-2 rounded-full bg-[#ff6b35]" />
        <h3 className="text-ink text-sm leading-[21px] font-bold tracking-[-0.35px]">
          {title}
        </h3>
      </div>

      <ol className="flex flex-col gap-2.5">
        {steps.map((step, i) => (
          <li
            key={step.text}
            className="flex items-center justify-between gap-3 rounded-xl border border-[rgba(229,231,235,0.6)] bg-white px-3 py-2 drop-shadow-[0px_2px_3px_rgba(0,0,0,0.04)]"
          >
            <div className="flex items-center gap-2.5">
              <span className="bg-surface-muted text-ink flex size-5 shrink-0 items-center justify-center rounded-lg pt-[0.75px] pb-[2.25px] text-[11px] leading-[16.5px] font-bold">
                {i + 1}
              </span>
              <span className="text-[12.5px] leading-[18.75px] font-medium break-keep text-[#1f2937]">
                {step.text}
                {step.sub && (
                  <span className="text-xs leading-4 font-normal text-[#9ca3af]">
                    {' '}
                    {step.sub}
                  </span>
                )}
              </span>
            </div>
            {step.href && (
              <a
                href={step.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center gap-0.5 font-semibold text-[#6e7687]"
              >
                <span className="text-[11.5px] leading-[17.25px]">열기</span>
                <span aria-hidden="true" className="text-[10px] leading-[15px]">
                  ↗
                </span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

function BlueGuideCard({ title, steps }: CardProps) {
  return (
    <div className="font-noto flex w-full flex-col gap-[7px] rounded-[14px] border border-[#dce7f9] bg-[#f0f5ff] px-[18px] pt-[23px] pb-6">
      <h3 className="text-[13px] leading-normal font-extrabold text-[#33445f]">
        {title}
      </h3>

      <ol className="flex flex-col gap-[7px]">
        {steps.map((step, i) => (
          <li
            key={step.text}
            className="flex items-center gap-[9px] first:pt-[3px]"
          >
            <span className="flex size-[22px] shrink-0 items-center justify-center rounded-[11px] bg-white text-[10px] leading-normal font-extrabold text-[#5679b8]">
              {i + 1}
            </span>
            <span className="text-xs leading-normal break-keep text-[#66758b]">
              {step.text}
              {step.sub && ` ${step.sub}`}
            </span>
            {step.href && (
              <a
                href={step.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto shrink-0 text-xs leading-normal text-[#667892] underline decoration-solid"
              >
                열기 ↗
              </a>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default GuideStepCard

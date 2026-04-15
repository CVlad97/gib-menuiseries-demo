import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description: string
  action?: ReactNode
  light?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl space-y-4">
        <span className="eyebrow">{eyebrow}</span>
        <div className="space-y-4">
          <h2 className={`section-title ${light ? 'text-[var(--text)]' : 'text-[var(--text-dark)]'}`}>
            {title}
          </h2>
          <p className={`max-w-2xl text-sm leading-7 sm:text-base ${light ? 'text-[var(--text-soft)]' : 'text-black/62'}`}>
            {description}
          </p>
        </div>
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  )
}

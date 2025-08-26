import { cn } from '@yaksok/utils'
import { type VariantProps, cva } from 'class-variance-authority'
// ui/Badge.tsx
import { ComponentPropsWithoutRef, ReactNode } from 'react'

type BaseProps = {
  title: string
  description: string
  miniTitle?: string
  icon?: ReactNode
  lineBackground?: boolean
}

export type BadgeProps = BaseProps &
  ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof containerVariants> & {
    contentClassName?: string
  }

const containerVariants = cva(
  'relative isolate overflow-hidden flex min-h-40 max-h-50 h-40 min-w-40 flex-col rounded-2xl transition-shadow',
  {
    variants: {
      variant: {
        card: 'px-4 py-10 bg-white shadow-basic2 gap-1 text-gray01 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#018381]/30',
        promo:
          'px-3 py-3 bg-[#0E9E98] text-white rounded-lg shadow-[1px_1px_4px_0_rgba(0,0,0,0.10)] [background:linear-gradient(189deg,#02A9A7_-23.39%,#11AAA8_6.07%,#018381_75.46%)] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30',
      },
    },
    defaultVariants: { variant: 'card' },
  }
)

const contentVariants = cva('', {
  variants: {
    variant: {
      card: 'flex flex-col gap-1 items-start h-[176px]',
      promo:
        'relative z-10 rounded-[12px] bg-white/12 backdrop-blur-[6px] inline-flex flex-col items-start gap-0.2 p-3',
    },
  },
})

/** 곡선 2개를 그리는 절대배치 SVG (이미지 파일 불필요) */
function DecorativeArcs() {
  return (
    <>
      {/* 왼쪽 원 (cx=101, cy=12, r=100) */}
      <svg
        className="pointer-events-none absolute top-2 right-0 h-[113px] w-[93px]"
        viewBox="0 0 93 113"
        fill="none"
        aria-hidden
      >
        <circle cx="101" cy="12" r="100" stroke="#03ABA8" strokeWidth="2" />
      </svg>

      {/* 오른쪽 원 (cx=101, cy=59, r=100) */}
      <svg
        className="pointer-events-none absolute top-0 right-0 h-[160px] w-[43px]"
        viewBox="0 0 43 160"
        fill="none"
        aria-hidden
      >
        <circle cx="101" cy="59" r="100" stroke="#03ABA8" strokeWidth="2" />
      </svg>
    </>
  )
}

export function Badge({
  miniTitle,
  title,
  description,
  icon,
  variant,
  className,
  contentClassName,
  lineBackground = false,
  ...props
}: BadgeProps) {
  const isPromo = variant === 'promo'

  return (
    <button
      type="button"
      className={cn(containerVariants({ variant }), className)}
      {...props}
    >
      {lineBackground && <DecorativeArcs />}

      {isPromo && icon ? (
        <div className="mb-2 h-10 w-10 rounded-[12px] bg-white/15 px-2.5 py-3">
          {icon}
        </div>
      ) : null}

      <div className={cn(contentVariants({ variant }), contentClassName)}>
        <span
          className={cn(
            'text-subhead3',
            isPromo ? 'text-white/90' : 'text-primary'
          )}
        >
          {miniTitle}
        </span>
        <h2
          className={cn(
            'text-subhead1',
            isPromo ? 'text-white' : 'text-gray01'
          )}
        >
          {title}
        </h2>
        <p
          className={cn(
            'whitespace-pre-line text-start text-base text-caption1',
            isPromo ? 'text-white/90' : 'text-gray02'
          )}
        >
          {description}
        </p>
      </div>
    </button>
  )
}

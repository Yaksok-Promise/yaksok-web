import MagazineLogo from '@assets/magazine-logo.png'
import { Fallbackimg } from '@yaksok/ui'
import { forwardRef } from 'react'

export const MagazineDetailFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className="flex w-full flex-col items-center justify-center gap-0.75 bg-black py-4 text-caption1 text-gray06"
    >
      <h1>감도 높은 웰빙 큐레이션</h1>
      <Fallbackimg
        src={MagazineLogo}
        alt="메거진 로고"
        imgClassName="w-19 h-6"
      />
    </div>
  )
})

MagazineDetailFooter.displayName = 'MagazineDetailFooter'

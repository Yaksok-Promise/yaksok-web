import { cn } from '@yaksok/utils'
import { FooterDrawer } from './footer-drawer'
export type FooterProps = {
  className?: string
}
export function Footer({ className }: FooterProps) {
  return (
    <div
      className={cn(
        'w-full bg-gray07 px-5 pt-9 text-[10px] text-subGray01 leading-[18px] tracking-[-0.2px]',
        className
      )}
    >
      <FooterDrawer />
      <div className="mb-4 flex divide-x divide-subGray01 align-middle font-semibold">
        <button className="pr-2">개인정보 처리방침</button>
        <button className="px-2">이용약관</button>
        <button className="px-2">고객센터</button>
      </div>
      <div className="pb-20">ⓒ 회사명. All Rights Reserved</div>
    </div>
  )
}

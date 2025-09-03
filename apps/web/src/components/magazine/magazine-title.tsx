import MagazineLogo from '@/assets/magazine-logo.png'
import { FallbackImgProps, Fallbackimg } from '@yaksok/ui'
import { cn } from '@yaksok/utils'

export type MagazineTitleProps = {
  fallbackImgProps?: FallbackImgProps
  titleClassName?: string
  instagramClassName?: string
}
export const MagazineTitle = ({
  fallbackImgProps,
  titleClassName,
  instagramClassName,
}: MagazineTitleProps) => {
  const goInstagram = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    //https://www.instagram.com/yakin_mag?igsh=a2NxM2phMmx2bHF0
    console.log('goInstagram')
  }
  return (
    <>
      <Fallbackimg
        src={MagazineLogo}
        alt="메거진 로고"
        fallbackSrc={MagazineLogo}
        wrapperClassName="w-[89px] h-[26px] mb-3"
        {...fallbackImgProps}
      />
      <span className={cn('mb-1 text-gray07 text-subhead3', titleClassName)}>
        약사가 알려주는 의약·웰빙·라이프스타일의 모든 것
      </span>
      <span
        className={cn(
          'text-caption1 text-gray06 underline',
          instagramClassName
        )}
        role="button"
        onClick={goInstagram}
      >
        인스타그램에서 보기
      </span>
    </>
  )
}

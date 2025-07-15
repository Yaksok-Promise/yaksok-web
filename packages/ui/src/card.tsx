import { MagazineLogo } from '@yaksok/icons'
import { changeNumberToString, cn } from '@yaksok/utils'
import { ComponentPropsWithoutRef, type JSX } from 'react'
import Fallbackimg from './fallback-img'

export type CardProps = ComponentPropsWithoutRef<'div'> & {
  imgSrc: string
  imgAlt: string
  imgFallbackSrc: string
  title: string
  brand: string
  description: string
  classification: string
  imgClassName?: string
  wrapperClassName?: string
}

export function Card({
  className,
  title,
  children,
  imgSrc,
  imgAlt,
  imgFallbackSrc,
  imgClassName,
  wrapperClassName,
  brand,
  description,
  classification,
  ...props
}: CardProps): JSX.Element {
  return (
    <div
      className={cn(
        'flex max-h-[378px] min-h-[378px] min-w-[314px] max-w-[314px] flex-col rounded-[16px] bg-white01 shadow-card-ui',
        className
      )}
      {...props}
    >
      <div className="relative h-full min-h-[236px] w-full min-w-[314px]">
        <Fallbackimg
          src={imgSrc}
          alt={imgAlt}
          fallbackSrc={imgFallbackSrc}
          imgClassName={cn('w-full h-full', imgClassName)}
          wrapperClassName={wrapperClassName}
        />
        <div className="absolute top-2 right-2 rounded-[20px] bg-[#2c2c2e]/60 px-2 py-0.5 text-center text-caption1 text-white01">
          {classification}
        </div>
      </div>
      <div className="flex flex-col gap-1 px-5 py-6">
        <span className=" text-caption1 text-gray04">{brand}</span>
        <h2 className="text-head6">{title}</h2>
        <p className="text-body2 text-gray02">{description}</p>
      </div>
    </div>
  )
}

export type MagazineCardProps = ComponentPropsWithoutRef<'div'> & {
  imgSrc: string
  imgAlt: string
  imgFallbackSrc: string
  title: string
  date: string
  number: number
  overlayClassName?: string
}

export function MagazineCard({
  className,
  title,
  imgSrc,
  imgAlt,
  imgFallbackSrc,
  date,
  number,
  overlayClassName,
  ...props
}: MagazineCardProps) {
  return (
    <div
      className={cn(
        'relative flex h-[356px] w-[292px] flex-col justify-between overflow-hidden rounded-[16px] px-4 pt-6 pb-8 shadow-basic2',
        className
      )}
      role="button"
      {...props}
    >
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* 어두운 오버레이 */}
      <div className={cn('absolute inset-0 bg-black/50', overlayClassName)} />

      {/* 콘텐츠 */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-2">
            <MagazineLogo size={42} />
            <span className="text-caption1 text-white01">{date}</span>
          </div>
          <span className="text-right text-head5 text-white01">
            {changeNumberToString(number, { len: 2, str: '0' })}
          </span>
        </div>
        <h1 className="text-balance text-head6 text-white">{title}</h1>
      </div>
    </div>
  )
}

import { cn } from '@yaksok/utils'
import { ComponentPropsWithoutRef, type JSX } from 'react'
import Fallbackimg from './fallback-img'

type CardProps = ComponentPropsWithoutRef<'div'> & {
  imgSrc: string
  imgAlt: string
  imgFallbackSrc: string
  imgClassName?: string
  wrapperClassName?: string
  title: string
  brand: string
  description: string
  classification: string
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

import { cn } from '@yaksok/utils'
import FallbackSrc from './asset/Image-not-found.png'

export type FallbackImgProps = {
  src?: string
  alt: string
  fallbackSrc?: string
  imgClassName?: string
  wrapperClassName?: string
}

export function Fallbackimg({
  src,
  alt,
  imgClassName,
  wrapperClassName,
  fallbackSrc = FallbackSrc,
}: FallbackImgProps) {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-center',
        wrapperClassName
      )}
    >
      <img
        src={src || fallbackSrc}
        alt={alt}
        onError={e => {
          console.log(e)
          e.currentTarget.src = fallbackSrc
        }}
        className={cn('aspect-auto object-cover object-center', imgClassName)}
      />
    </div>
  )
}

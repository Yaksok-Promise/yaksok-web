import { cn } from '@yaksok/utils'

export type FallbackImgProps = {
  src: string
  alt: string
  fallbackSrc: string
  imgClassName?: string
  wrapperClassName?: string
}

export default function Fallbackimg({
  src,
  alt,
  fallbackSrc,
  imgClassName,
  wrapperClassName,
}: FallbackImgProps) {
  return (
    <div className={cn('w-full', wrapperClassName)}>
      <img
        src={src}
        alt={alt}
        onError={e => {
          e.currentTarget.src = fallbackSrc
        }}
        className={cn('aspect-auto object-cover object-center', imgClassName)}
      />
    </div>
  )
}

import { cn } from '@yaksok/utils'
import { EmblaCarouselType } from 'embla-carousel'
import { useRef } from 'react'
import { useCarousel } from './carousel-context'
import { useAutoplay } from './use-auto-play'
import { useAutoplayProgress } from './use-auto-play-progress'

interface DotProps {
  isActive: boolean
  embla: EmblaCarouselType | undefined
}

const Dot: React.FC<DotProps> = ({ isActive, embla }) => {
  const progressRef = useRef<HTMLDivElement>(null)
  useAutoplayProgress(embla, progressRef)

  const autoPlay = embla?.plugins().autoplay
  const timeUntilNext = autoPlay?.timeUntilNext()

  if (isActive) {
    return (
      <>
        <div
          className={cn(
            'relative h-1.25 w-[35px] overflow-hidden rounded-[10px] bg-gray06'
          )}
        >
          <div
            ref={progressRef}
            className="absolute top-0 bottom-0 w-full origin-left bg-black01"
            style={{
              animation: `slide var(--autoplay-duration, ${timeUntilNext}ms) linear forwards`,
            }}
          />
        </div>
      </>
    )
  }

  return <div className="h-1.25 w-1.25 rounded-full bg-gray06" />
}

export const CarouselDotButton: React.FC = () => {
  const { selectedIndex, scrollSnaps, embla } = useCarousel()

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {scrollSnaps.map((_, index) => (
        <Dot key={index} isActive={selectedIndex === index} embla={embla} />
      ))}
    </div>
  )
}

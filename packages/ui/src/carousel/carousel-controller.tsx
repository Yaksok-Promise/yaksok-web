import { Pause, Play } from '@yaksok/icons'
import { changeNumberToString, cn } from '@yaksok/utils'
import { EmblaCarouselType } from 'embla-carousel'
import { useCarousel } from './carousel-context'
import { useAutoplay } from './use-auto-play'

export const CarouselController: React.FC = () => {
  const { selectedIndex, scrollSnaps, embla } = useCarousel()

  return (
    <div className="-mr-[0.6rem] flex flex-wrap items-center gap-[8px]">
      <CarouselAnimationBar
        selectedIndex={selectedIndex}
        totalLength={scrollSnaps.length}
      />
      <CarouselAutoPlayButton embla={embla} />
      <CarouselBadge
        selectedIndex={selectedIndex}
        totalLength={scrollSnaps.length}
      />
    </div>
  )
}

type CarouselCountProps = {
  selectedIndex: number
  totalLength: number
}
const CarouselBadge: React.FC<CarouselCountProps> = ({
  selectedIndex,
  totalLength,
}) => {
  return (
    <div className="rounded-sm bg-gray06/70 px-2 text-center text-[10px] leading-[18px] tracking-[-0.2]">
      <span className="font-semibold text-gray03">
        {changeNumberToString(selectedIndex + 1, { len: 2, str: '0' })}
      </span>
      <span className="font-normal text-gray05">
        /{changeNumberToString(totalLength, { len: 2, str: '0' })}
      </span>
    </div>
  )
}

type CarouselAutoPlayButtonProps = {
  embla: EmblaCarouselType | undefined
}

const CarouselAutoPlayButton: React.FC<CarouselAutoPlayButtonProps> = ({
  embla,
}) => {
  const { autoplayIsPlaying, toggleAutoplay } = useAutoplay(embla)
  return autoplayIsPlaying ? (
    <Pause onClick={toggleAutoplay} width={18} height={18} />
  ) : (
    <Play onClick={toggleAutoplay} width={18} height={18} />
  )
}

const CarouselAnimationBar: React.FC<CarouselCountProps> = ({
  selectedIndex,
  totalLength,
}) => {
  const percentage = ((selectedIndex + 1) / totalLength) * 100

  return (
    <div className="relative h-[2px] w-[150px] overflow-hidden rounded-sm bg-gray06">
      <div
        className="absolute top-0 left-0 h-full bg-green01 transition-all duration-700 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

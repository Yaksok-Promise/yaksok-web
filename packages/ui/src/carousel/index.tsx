import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback } from 'react'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const Carousel: React.FC<PropType> = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )

  return (
    <section className="mx-auto max-w-3xl">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="ml-[-1rem] flex touch-pan-y">
          {slides.map(index => (
            <div
              key={index}
              className="min-w-0 flex-[0_0_100%] transform-gpu pl-4"
            >
              <div className="flex h-[19rem] select-none items-center justify-center rounded-[1.8rem] font-semibold text-6xl shadow-inner">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 grid grid-cols-[auto_1fr] justify-between gap-4">
        <div className="-mr-[0.6rem] flex flex-wrap items-center justify-end">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`m-0 inline-flex h-[2.6rem] w-[2.6rem] touch-manipulation appearance-none items-center justify-center rounded-full border-0 bg-transparent p-0 after:h-[1.4rem] after:w-[1.4rem] after:rounded-full after:shadow-[inset_0_0_0_2px_theme(colors.gray.400)] after:content-[''] ${
                index === selectedIndex
                  ? 'after:shadow-[inset_0_0_0_2px_theme(colors.black)]'
                  : ''
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Carousel

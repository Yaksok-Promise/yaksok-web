import { ChevronRight } from '@yaksok/icons'
import { cn } from '@yaksok/utils'
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import { useCarousel } from './carousel-context'
import { DivWihoutRefAndChildren } from './carousel-root'

export const CarouselTrack: React.FC<
  {
    children: ReactElement[] | ReactElement
  } & DivWihoutRefAndChildren
> = ({ children, className, ...props }) => {
  const { emblaRef } = useCarousel()

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div
        className={cn(
          'ml-[-1rem] flex min-w-0 flex-[0_0_98%] transform-gpu touch-pan-y gap-5 py-1 pl-5',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}

export const CarouselBackground = <T,>({
  children,
  items,
  className,
  onClick,
  ...props
}: {
  children?: ReactNode
  items: T[]
  onClick: () => void
} & Omit<DivWihoutRefAndChildren, 'onClick'>) => {
  const { embla } = useCarousel()
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!embla) return

    const onSelect = () => {
      setSelectedIndex(embla.selectedScrollSnap())
    }

    embla.on('select', onSelect)
    onSelect()

    return () => {
      embla.off('select', onSelect)
    }
  }, [embla])

  const currentCard = items[selectedIndex]
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const currentCardImgSrc = (currentCard as any)?.imgSrc! as string

  return (
    <div className="absolute h-[258px] w-full overflow-hidden" {...props}>
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${currentCardImgSrc})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(50px)',
        }}
      />

      {/* 실제 콘텐츠 (텍스트 등) */}
      <div className="relative z-10 p-6">
        {children}
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-head5 text-white">Magazine</h2>
          <button className="text-white" onClick={onClick}>
            <ChevronRight size={32} />
          </button>
        </div>
        <p className="mt-2 text-caption1 text-white">
          약사가 알려주는{' '}
          <strong className="text-subhead3">의약·웰니스 라이프</strong>의 모든
          것
        </p>
      </div>
    </div>
  )
}

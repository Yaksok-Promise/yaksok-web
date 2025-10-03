import NotSolution from '@/assets/notSolution@2.png'

import { Card, CardProps, Carousel } from '@yaksok/ui'

export type MainCarouselProps = {
  data?: CardProps[]
  className?: string
}
export function MainCarousel({ data, className }: MainCarouselProps) {
  return (
    <div className={className}>
      {data && (
        <Carousel.Root>
          <Carousel.Slide>
            <Carousel.Track className="pb-2">
              {data.map((data, index) => (
                <Card {...data} key={index} className="cursor-pointer" />
              ))}
            </Carousel.Track>
          </Carousel.Slide>
          <div className="mt-2 flex items-center justify-center">
            <Carousel.Controller />
          </div>
        </Carousel.Root>
      )}
      {!data && (
        <div>
          <div className="flex items-center justify-center">
            <Card
              imgSrc={NotSolution}
              imgAlt={'click'}
              imgFallbackSrc={NotSolution}
              title={'검단 문진 하러 가기'}
              brand={''}
              description={
                '김약속님은 아직 문진 전이에요\n 문진을 기록하고 약속의 추천 제품을 확인하세요'
              }
              imgClassName="w-40 h-40"
              className="cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  )
}

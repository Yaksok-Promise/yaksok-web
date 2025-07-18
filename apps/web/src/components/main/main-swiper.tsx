import AddPlus from '@/assets/Add_Plus_Circle.png'
import { Card, CardProps, Carousel } from '@yaksok/ui'

export type PhilSwiperProps = {
  data?: CardProps[]
}
export function MainSwiper({ data }: PhilSwiperProps) {
  return (
    <div>
      {data && (
        <Carousel.Root>
          <Carousel.Track>
            {data.map((data, index) => (
              <Card {...data} key={index} />
            ))}
          </Carousel.Track>
          <div className="mt-2 flex items-center justify-center">
            <Carousel.Controller />
          </div>
        </Carousel.Root>
      )}
      {!data && (
        <div className="flex items-center justify-center">
          <Card
            imgSrc={AddPlus}
            imgAlt={'click'}
            imgFallbackSrc={AddPlus}
            title={'검단 문진 하러 가기'}
            brand={''}
            description={
              '김약속님은 아직 문진 전이에요\n 문진을 기록하고 약속의 추천 제품을 확인하세요'
            }
            imgClassName="w-9 h-9"
          />
        </div>
      )}
    </div>
  )
}

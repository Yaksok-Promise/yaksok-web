import { Card, CardProps, Carousel } from '@yaksok/ui'

export type PhilSwiperProps = {
  data?: CardProps[]
}
export default function PhilSwiper({ data }: PhilSwiperProps) {
  return (
    <div>
      {data && (
        <Carousel.Root>
          <Carousel.Track>
            {data.map((data, index) => (
              <Card {...data} key={index} />
            ))}
          </Carousel.Track>
          <div className="flex items-center justify-between">
            <Carousel.Controller />
          </div>
        </Carousel.Root>
      )}
    </div>
  )
}

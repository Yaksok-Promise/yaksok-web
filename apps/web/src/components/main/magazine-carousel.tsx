import ExImg from '@/assets/ex.png'
import MagazineImg from '@/assets/magazine.png'
import MagazineImg2 from '@/assets/magazine2.png'
import { useFlow } from '@/utils/stackflow'
import { Carousel, MagazineCard } from '@yaksok/ui'

export default function MagazineCarousel() {
  const data = [
    {
      imgSrc: MagazineImg,
      imgAlt: 'ex',
      imgFallbackSrc: ExImg,
      title: '오늘의 피로는 술로 풀고 숙취는 이렇게 푸는 거야',
      date: '2025.07.15',
      number: 1,
    },
    {
      imgSrc: MagazineImg2,
      imgAlt: 'ex',
      imgFallbackSrc: ExImg,
      title: '여행갈 때 챙겨야 할 상비약 리스트',
      date: '2025.07.15',
      number: 2,
    },
  ]

  const { push } = useFlow()
  return (
    <div className="mb-25">
      <Carousel.Root
        options={{ loop: false }}
        autoPlayOption={{ playOnInit: true }}
      >
        <Carousel.Background
          items={data}
          onClick={() => {
            push('MagazinePage', {})
          }}
        />
        <Carousel.Track className="mt-22 px-4">
          {data.map((data, index) => (
            <Carousel.Slide key={index} className="mt-4 pl-3">
              <MagazineCard
                {...data}
                onClick={() => console.log('카드 링크 연결 필요', data.title)}
              />
            </Carousel.Slide>
          ))}
        </Carousel.Track>
      </Carousel.Root>
    </div>
  )
}

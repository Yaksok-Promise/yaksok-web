import type { Meta, StoryObj } from '@storybook/react'
import { Card, MagazineCard } from '@yaksok/ui'
import { Carousel } from '@yaksok/ui/carousel'
import ExImg from '../assets/ex.png'
import MagazineImg from '../assets/magazine.png'
import MagazineImg2 from '../assets/magazine2.png'

const meta: Meta<typeof Carousel.Root> = {
  component: Carousel.Root,
}

export default meta

type Story = StoryObj<typeof Carousel.Root>
// CarouselSlide.tsx

const CarouselSlide: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-w-0 flex-[0_0_98%] transform-gpu py-4 pl-2.5">
      <div className="flex select-none">{children}</div>
    </div>
  )
}

export const Primary: Story = {
  render: props => (
    <Carousel.Root {...props}>
      <Carousel.Track>
        {[0, 1, 2, 3, 4, 5].map(index => (
          <CarouselSlide key={index}>{index + 1}</CarouselSlide>
        ))}
      </Carousel.Track>
      <Carousel.Dots />
      <Carousel.Controller />
    </Carousel.Root>
  ),
  name: 'Carousel',
  args: {
    options: {},
    autoPlayOption: {
      delay: 1500,
    },
  },
}

export const CardCarousel: Story = {
  render: props => {
    const data = [
      {
        imgSrc: ExImg,
        imgAlt: 'ex',
        imgFallbackSrc: ExImg,
        title: '비맥스 메타정',
        classification: '멀티비티민',
        description:
          '음식만으론 부족한 필수 영양소,\n 멀티비타민으로 간편하게 채워보세요.',
        brand: 'GC녹십자',
      },
      {
        imgSrc: ExImg,
        imgAlt: 'ex',
        imgFallbackSrc: ExImg,
        title: '비맥스 메타정',
        classification: '멀티비티민',
        description:
          '음식만으론 부족한 필수 영양소,\n 멀티비타민으로 간편하게 채워보세요.',
        brand: 'GC녹십자',
      },
      {
        imgSrc: ExImg,
        imgAlt: 'ex',
        imgFallbackSrc: ExImg,
        title: '비맥스 메타정',
        classification: '멀티비티민',
        description:
          '음식만으론 부족한 필수 영양소,\n 멀티비타민으로 간편하게 채워보세요.',
        brand: 'GC녹십자',
      },
      {
        imgSrc: ExImg,
        imgAlt: 'ex',
        imgFallbackSrc: ExImg,
        title: '비맥스 메타정',
        classification: '멀티비티민',
        description:
          '음식만으론 부족한 필수 영양소,\n 멀티비타민으로 간편하게 채워보세요.',
        brand: 'GC녹십자',
      },
    ]
    return (
      <Carousel.Root {...props}>
        <Carousel.Track>
          {data.map((data, index) => (
            <Carousel.Slide key={index}>
              <Card key={index} {...data} />
            </Carousel.Slide>
          ))}
        </Carousel.Track>
        <Carousel.Dots />
        <Carousel.Controller />
      </Carousel.Root>
    )
  },
  name: 'Card Carousel',
  args: {
    options: { loop: false },
    autoPlayOption: {
      delay: 1500,
      stopOnLastSnap: true,
    },
  },
}

export const MagazineCarousel: Story = {
  render: props => {
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
    return (
      <Carousel.Root {...props}>
        <Carousel.Background
          items={data}
          onClick={() => {
            console.log('click')
          }}
        />
        <Carousel.Track className="mt-22 px-4">
          {data.map((data, index) => (
            <CarouselSlide key={index}>
              <MagazineCard {...data} />
            </CarouselSlide>
          ))}
        </Carousel.Track>
      </Carousel.Root>
    )
  },
  name: 'Magazine Carousel',
  args: {
    options: { loop: false },
    autoPlayOption: {
      playOnInit: false,
    },
  },
}

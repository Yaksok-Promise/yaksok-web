import type { Meta, StoryObj } from '@storybook/react'
import { Carousel } from '@yaksok/ui/carousel'

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
    <div className="min-w-0 flex-[0_0_100%] transform-gpu pl-4">
      <div className="flex h-[19rem] select-none items-center justify-center rounded-[1.8rem] font-semibold text-6xl shadow-inner">
        {children}
      </div>
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

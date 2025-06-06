import type { Meta, StoryObj } from '@storybook/react'
import { Carousel } from '@yaksok/ui/carousel/index'

const meta: Meta<typeof Carousel.Root> = {
  component: Carousel.Root,
}

export default meta

type Story = StoryObj<typeof Carousel.Root>

export const Primary: Story = {
  render: props => (
    <Carousel.Root {...props}>
      <Carousel.Track>
        {[0, 1, 2, 3, 4, 5].map(index => (
          <Carousel.Slide key={index}>{index + 1}</Carousel.Slide>
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
      delay: 2000,
    },
  },
}

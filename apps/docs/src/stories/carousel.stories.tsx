import type { Meta, StoryObj } from '@storybook/react'
import { Carousel } from '@yaksok/ui/carousel/index'

const meta: Meta<typeof Carousel> = {
  component: Carousel.Root,
}

export default meta

type Story = StoryObj<typeof Carousel>

export const Primary: Story = {
  render: props => (
    <Carousel.Root {...props}>
      <Carousel.Track>
        {[0, 1, 2, 3, 4, 5].map(index => (
          <Carousel.Slide key={index}>{index + 1}</Carousel.Slide>
        ))}
      </Carousel.Track>
      <Carousel.DotButton />
      <Carousel.Controller />
    </Carousel.Root>
  ),
  name: 'Carousel',
  args: {},
}

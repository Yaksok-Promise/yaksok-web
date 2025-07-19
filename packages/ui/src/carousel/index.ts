import { CarouselController } from './carousel-controller'
import { CarouselDotButton } from './carousel-dots'
import { CarouselRoot } from './carousel-root'
import { CarouselSlide } from './carousel-slide'
import { CarouselBackground, CarouselTrack } from './carousel-track'

export const Carousel = {
  Root: CarouselRoot,
  Track: CarouselTrack,
  Background: CarouselBackground,
  Dots: CarouselDotButton,
  Controller: CarouselController,
  Slide: CarouselSlide,
}

export { type EmblaOptionsType as CarouselOptionsType } from 'embla-carousel'
export { type AutoplayOptionsType } from 'embla-carousel-autoplay'

export default Carousel

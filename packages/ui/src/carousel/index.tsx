import { CarouselController } from './carousel-controller'
import { CarouselDotButton } from './carousel-dots'
import { CarouselRoot } from './carousel-root'
import { CarouselSlide } from './carousel-slide'
import { CarouselTrack } from './carousel-track'

export const Carousel = {
  Root: CarouselRoot,
  Track: CarouselTrack,
  Slide: CarouselSlide,
  Dots: CarouselDotButton,
  Controller: CarouselController,
}

export { type EmblaOptionsType as CarouselOptionsType } from 'embla-carousel'
export { type AutoplayOptionsType } from 'embla-carousel-autoplay'

export default Carousel

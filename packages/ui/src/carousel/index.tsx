import { CarouselDotButton } from './carousel-buttons'
// index.ts
import { CarouselRoot } from './carousel-root'
import { CarouselSlide } from './carousel-slide'
import { CarouselTrack } from './carousel-track'

export const Carousel = {
  Root: CarouselRoot,
  Track: CarouselTrack,
  Slide: CarouselSlide,
  DotButton: CarouselDotButton,
}

export { type EmblaOptionsType as CarouselOptionsType } from 'embla-carousel'
export { type AutoplayOptionsType } from 'embla-carousel-autoplay'

export default Carousel

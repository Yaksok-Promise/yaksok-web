import Carousel, {
  AutoplayOptionsType,
  CarouselOptionsType,
} from '@yaksok/ui/carousel/index'
import '@yaksok/ui/styles.css'
function App() {
  const OPTIONS: CarouselOptionsType = { dragFree: true, loop: true }
  const AUTO_PLAY_OPTIONS: AutoplayOptionsType = { stopOnInteraction: false }
  const SLIDE_COUNT = 5
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
  return (
    <div className="h-screen">
      <div>Admin template</div>
      <div className="flex items-center gap-5">
        <Carousel.Root options={OPTIONS} autoPlayOption={AUTO_PLAY_OPTIONS}>
          <Carousel.Track>
            {SLIDES.map(index => (
              <Carousel.Slide key={index}>{index + 1}</Carousel.Slide>
            ))}
          </Carousel.Track>
          <Carousel.DotButton />
        </Carousel.Root>
      </div>
    </div>
  )
}

export default App

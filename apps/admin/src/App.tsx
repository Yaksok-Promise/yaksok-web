import '@yaksok/ui/styles.css'
function App() {
  const OPTIONS: CarouselOptionsType = { dragFree: true, loop: true }
  const AUTO_PLAY_OPTIONS: AutoplayOptionsType = { stopOnInteraction: false }
  const SLIDE_COUNT = 5
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
  return (
    <div className="h-screen">
      <div>Admin template</div>
    </div>
  )
}

export default App

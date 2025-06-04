import '@yaksok/ui/styles.css'
function App() {
  const OPTIONS = { dragFree: true, loop: true }
  const SLIDE_COUNT = 5
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
  return (
    <div className="h-screen">
      <div>Admin template</div>
    </div>
  )
}

export default App

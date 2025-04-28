import MainPage from '@/app/index/page'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  )
}

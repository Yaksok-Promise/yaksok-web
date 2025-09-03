import { MainCarousel } from '../main/main-carousel'

export default function MagazineLounge() {
  const isDone = false
  return (
    <div className="mt-7 flex flex-col">
      <h1 className="mb-1 text-head6">김약속님을 위한 약속 Lounge</h1>
      <span className="mb-5 text-caption1 text-gray03">
        {/* api 솔루션 연동에 따른 문구 수정 필요 */}
        {isDone
          ? '김약속님의 맞춤 영양 솔루션 제품이에요'
          : '김약속님의 맞춤 영양 솔루션이 준비되지 않았어요.'}
      </span>
      <MainCarousel />
    </div>
  )
}

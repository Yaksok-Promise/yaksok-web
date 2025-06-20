import TopBar from '@/components/common/TopBar'
import { useFlow } from '@/utils/stackflow'
import { AppScreen } from '@stackflow/plugin-basic-ui'

export default function MainPage() {
  const { push } = useFlow()

  const onClick = () => {
    push('ComparePage', {
      title: '성분 비교하기',
    })
  }

  const goSignup = () => {
    push('SignupPage', {
      title: '회원가입',
    })
  }

  return (
    <div>
      <TopBar />
      <div className="mt-10 h-[calc(100vh-64px)] bg-bgColor px-10">
        <button
          onClick={onClick}
          className="my-10 w-full bg-black01 text-center text-white01"
        >
          의약품 및 건강기능식품 성분 비교하기
        </button>

        <button
          onClick={goSignup}
          className="my-10 w-full bg-black01 text-center text-white01"
        >
          회원가입
        </button>
        <div className="text-2xl">안녕하세요</div>
      </div>
    </div>
  )
}

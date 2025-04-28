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

  return (
    <AppScreen>
      <TopBar />
      <div className="h-screen bg-bgColor">
        <button onClick={onClick}>의약품 및 건강기능식품 성분 비교하기</button>
      </div>
    </AppScreen>
  )
}

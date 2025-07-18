import TopBar from '@/components/common/TopBar'
import { useFlow } from '@/utils/stackflow'
import { AppScreen } from '@stackflow/plugin-basic-ui'

export default function MainPage() {
  const { push } = useFlow()

  const _onClick = () => {
    push('ComparePage', {
      title: '성분 비교하기',
    })
  }

  const _goSignup = () => {
    push('SignupPage', {
      title: '회원가입',
    })
  }

  const _goSignin = () => {
    push('Signin', {
      title: '로그인',
    })
  }

  return (
    <AppScreen>
      <TopBar />
      <div className="mt-10 h-[calc(100vh-64px)] bg-bgColor px-10"></div>
    </AppScreen>
  )
}

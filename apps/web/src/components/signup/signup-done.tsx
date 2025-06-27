import { useFlow } from '@/utils/stackflow'
import { Button } from '@yaksok/ui'
import SignupTitle from './signup-title'
import SignupDone from '@assets/signup-done.png'

export default function SignupDonePage() {
  const { push } = useFlow()

  const pushMain = () => {
    push('MainPage', {})
  }
  return (
    <div className="relative flex h-screen flex-col items-center justify-center gap-10">
      <SignupTitle>회원가입 완료!</SignupTitle>
      <img src={SignupDone} />
      <div className="flex flex-col items-center justify-center">
        <span className="text-body1">회원가입을 축하드려요!</span>
        <span className="text-body1">
          지금 바록 약속 서비스를 이용해보세요 {':)'}
        </span>
      </div>
      <Button onClick={pushMain}>홈 화면</Button>
    </div>
  )
}

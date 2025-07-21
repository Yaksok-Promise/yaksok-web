import FindId from '@/components/find-id-password/find-id'
import { FindPassword } from '@/components/find-id-password/find-password'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { ChevronLeft } from '@yaksok/icons'

export default function FindIdPassword() {
  return (
    <AppScreen
      appBar={{
        title: '아이디 비밀번호 찾기',
        backgroundColor: '#fafafa',
        border: false,
        renderLeft: () => (
          <button>
            <ChevronLeft />
          </button>
        ),
      }}
    >
      <div className="h-screen overflow-y-hidden bg-bgColor px-4 pt-7.5">
        <FindPassword />
      </div>
    </AppScreen>
  )
}

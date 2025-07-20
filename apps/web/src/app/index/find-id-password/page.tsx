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
      <div></div>
    </AppScreen>
  )
}

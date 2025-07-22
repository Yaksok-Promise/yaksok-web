import { Notification } from '@/components/common'
import { UserInfo } from '@/components/mypage'
import { AppScreen } from '@stackflow/plugin-basic-ui'

export default function Mypage() {
  return (
    <AppScreen>
      <main className="flex flex-col bg-bgColor px-4">
        <Notification wrapperClassName="flex h-16.5 items-center justify-end mb-4" />
        <UserInfo
          email="test@test.com"
          name="홍길동"
          profileUrl="https://via.placeholder.com/150"
        />
      </main>
    </AppScreen>
  )
}

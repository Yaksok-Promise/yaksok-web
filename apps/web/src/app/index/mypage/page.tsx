import { Notification } from '@/components/common'
import { AppScreen } from '@stackflow/plugin-basic-ui'

export default function Mypage() {
  return (
    <AppScreen>
      <main className="bg-bgColor px-4">
        <Notification wrapperClassName="flex h-16.5 items-center justify-end" />
      </main>
    </AppScreen>
  )
}

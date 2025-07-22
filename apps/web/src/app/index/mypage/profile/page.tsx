import { AppScreen } from '@stackflow/plugin-basic-ui'

export default function ProfilePage() {
  return (
    <AppScreen
      appBar={{
        title: '회원 정보 수정',
        backgroundColor: '#fafafa',
        border: false,
      }}
    >
      <main className="flex flex-col bg-bgColor px-4 pt-2.5 pb-40"></main>
    </AppScreen>
  )
}

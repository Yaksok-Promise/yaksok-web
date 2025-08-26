import FindId from '@/components/find-id-password/find-id'
import { FindPassword } from '@/components/find-id-password/find-password'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { ChevronLeft } from '@yaksok/icons'
import { Tabs, TabsProps } from '@yaksok/ui'

type FindIdPasswordProps = {
  params: {
    mode: 'id' | 'password'
  }
}
export default function FindIdPassword({
  params: { mode },
}: FindIdPasswordProps) {
  console.log(mode)
  const tabsInfo: TabsProps['tabInfo'] = [
    {
      value: 'id',
      label: '아이디',
      content: <FindId />,
    },
    {
      value: 'password',
      label: '비밀번호',
      content: <FindPassword />,
    },
  ]
  return (
    <AppScreen
      appBar={{
        title: '아이디 비밀번호 찾기',
        backgroundColor: '#fafafa',
        border: false,
      }}
    >
      <div className="h-screen overflow-y-hidden bg-bgColor px-4 pt-7.5">
        <Tabs
          tabInfo={tabsInfo}
          variant="box"
          wrapperClassName="items-center w-full gap-7.5 h-full"
          defaultValue={mode ? mode : 'id'}
        />
      </div>
    </AppScreen>
  )
}

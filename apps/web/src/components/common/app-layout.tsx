import { useFlow } from '@/utils/stackflow'
import { useActivity } from '@stackflow/react'
import { CommunicationDot, Gift, Home, Mail, User } from '@yaksok/icons'
import {
  isAppointmentPage,
  isBottomStackPage,
  isCommunityPage,
  isLoungePage,
  isMainPage,
  isMyPage,
} from '@yaksok/store'
import { useBottomStackHistoryStore } from '@yaksok/store'
import {
  BottomNavigationButton,
  BottomNavigationLayout,
} from '@yaksok/ui/bottom-navigation'
import { Fragment, useEffect } from 'react'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const activity = useActivity()

  const { addHistory } = useBottomStackHistoryStore()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    addHistory({ name: activity?.name, params: activity?.params })
  }, [activity?.name, activity?.params])

  return (
    <Fragment>
      {children}
      {isBottomStackPage(activity?.name) && <BottomNavigation />}
    </Fragment>
  )
}

function BottomNavigation() {
  const activity = useActivity()
  const {
    bottomStackHistory: { main, community, lounge, appointment, my },
  } = useBottomStackHistoryStore()
  const { replace } = useFlow()

  return (
    <BottomNavigationLayout>
      <BottomNavigationButton
        icon={Home}
        title="홈"
        isActive={isMainPage(activity?.name)}
        onClick={() => {
          replace(main.name, main.params)
        }}
      />
      <BottomNavigationButton
        icon={CommunicationDot}
        title="커뮤니티"
        isActive={isCommunityPage(activity?.name)}
        onClick={() => {
          replace(community.name, community.params)
        }}
      />
      <BottomNavigationButton
        icon={Gift}
        title="라운지"
        isActive={isLoungePage(activity?.name)}
        onClick={() => {
          replace(lounge.name, lounge.params)
        }}
      />
      <BottomNavigationButton
        icon={Mail}
        title="약속상담"
        isActive={isAppointmentPage(activity?.name)}
        onClick={() => {
          replace(appointment.name, appointment.params)
        }}
      />
      <BottomNavigationButton
        icon={User}
        title="마이"
        isActive={isMyPage(activity?.name)}
        onClick={() => {
          replace(my.name, my.params)
        }}
      />
    </BottomNavigationLayout>
  )
}

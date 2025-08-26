import Lounge from '@/components/lounge/lounge'
import LoungeMagazine from '@/components/lounge/lounge-magazine'
import LoungePayment from '@/components/lounge/lounge-payment'
import LoungeYaksokSubscription from '@/components/lounge/lounge-yaksok-subscription'
import { useGetToken } from '@/hooks/use-get-token'
import { useFlow } from '@/utils/stackflow'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { useLoginStore } from '@yaksok/store'

export default function LoungePage() {
  useGetToken()
  const { accessToken } = useLoginStore()
  const { push } = useFlow()

  return (
    <AppScreen
      appBar={{
        title: '라운지',
        backgroundColor: '#ffffff',
        border: false,
      }}
    >
      <main className="flex flex-col bg-white px-4 pb-10">
        <Lounge />
        <LoungePayment />
        <LoungeMagazine />
        <LoungeYaksokSubscription />
      </main>
    </AppScreen>
  )
}

import Lounge from '@/components/magazine/magazine-lounge'
import LoungeMagazine from '@/components/magazine/magazine'
import LoungePayment from '@/components/magazine/magazine-payment'
import LoungeYaksokSubscription from '@/components/magazine/magazine-yaksok-subscription'
import { useUpdateToken } from '@/hooks/use-update-token'
import { AppScreen } from '@stackflow/plugin-basic-ui'

export default function MagazinePage() {
  useUpdateToken()

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

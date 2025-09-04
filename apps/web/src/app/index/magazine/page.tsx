import LoungeMagazine from '@/components/magazine/magazine'
import Lounge from '@/components/magazine/magazine-lounge'
import LoungePayment from '@/components/magazine/magazine-payment'
import LoungeYaksokSubscription from '@/components/magazine/magazine-yaksok-subscription'
import { useUpdateToken } from '@/hooks/use-update-token'
import { AppScreen } from '@stackflow/plugin-basic-ui'

export default function MagazinePage() {
  useUpdateToken()

  return (
    <AppScreen
      appBar={{
        title: '메거진',
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

import LoungeAndMagazineDetail from '@/components/common/lounge-and-magazine-detail'
import { SideDrawer } from '@/components/common/side-drawer'
import { useGetToken } from '@/hooks/use-get-token'
import { Portal, usePortal } from '@/hooks/use-portal'
import { AppScreen } from '@stackflow/plugin-basic-ui'

type LoungeDetailPageProps = {
  params: {
    id: string
  }
}

export default function MagazineDetailPage({
  params: { id },
}: LoungeDetailPageProps) {
  useGetToken()
  const { portalRef, isOpen, setIsOpen } = usePortal()

  return (
    <>
      <AppScreen
        appBar={{
          title: '메거진',
          textColor: '#ffffff',
          iconColor: '#ffffff',
          backgroundColor: '#000000',
          border: false,
          renderRight: () => (
            <SideDrawer
              container={portalRef.current}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          ),
        }}
      >
        <main className="flex flex-col bg-white px-4 pb-10">
          <LoungeAndMagazineDetail id={id} />
        </main>
      </AppScreen>
      <Portal />
    </>
  )
}

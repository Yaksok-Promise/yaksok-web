import { SideDrawer } from '@/components/common/side-drawer'
import { useGetToken } from '@/hooks/use-get-token'
import { Portal, usePortal } from '@/hooks/use-portal'
import { useFlow } from '@/utils/stackflow'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { useLoginStore } from '@yaksok/store'

export default function MagazinePage() {
  useGetToken()
  const { accessToken } = useLoginStore()
  const { push } = useFlow()
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
        <header className="bg-black"></header>
        <main className="flex flex-col bg-bgColor px-4 pb-10"></main>
      </AppScreen>

      <Portal />
    </>
  )
}

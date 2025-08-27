import { SideDrawer } from '@/components/common/side-drawer'
import { LoungeTitle } from '@/components/lounge/lounge-magazine-title'
import { useGetToken } from '@/hooks/use-get-token'
import { Portal, usePortal } from '@/hooks/use-portal'
import { useFlow } from '@/utils/stackflow'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { cn } from '@yaksok/utils'

export default function MagazinePage() {
  useGetToken()
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
        <div className="relative h-screen overflow-auto">
          <MagazineHeader />
          <div>
            <div className="sticky top-0 h-10 w-full bg-gray bg-white">
              Tab구간
            </div>
            <div className="flex flex-col bg-bgColor px-4 pb-10">
              {/* 콘텐츠들… */}

              {Array.from({ length: 100 }).map((_, index) => (
                <div key={index} className="h-[100px] bg-red-500">
                  {index}
                </div>
              ))}
            </div>
          </div>
        </div>
      </AppScreen>

      <Portal />
    </>
  )
}

const MagazineHeader = () => {
  return (
    <header className={cn('sticky top-[-248px] w-full bg-black')}>
      <div className="flex h-[248px] flex-col px-5 pt-25 pb-7.5 transition-all duration-500">
        <LoungeTitle
          titleClassName="text-gray07 text-subhead2 mt-4 mb-5"
          instagramClassName="text-body2 text-gray05"
        />
      </div>
    </header>
  )
}

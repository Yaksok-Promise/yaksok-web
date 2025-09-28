import AppLayout from '@/components/common/app-layout'
import { LoungeAndMagazineTab } from '@/components/common/lounge-and-magazine-tab'
import { SideDrawer } from '@/components/common/side-drawer'
import { MagazineTitle } from '@/components/magazine/magazine-title'
import { MagazineCategoryKey } from '@/const/magazine-and-lounge'
import { Portal, usePortal } from '@/hooks/use-portal'
import { useUpdateToken } from '@/hooks/use-update-token'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { cn } from '@yaksok/utils'

export default function MagazineListPage() {
  useUpdateToken()
  const { portalRef, isOpen, setIsOpen } = usePortal()

  return (
    <AppLayout>
      <AppScreen
        appBar={{
          title: '메거진',
          textColor: '#ffffff',
          iconColor: '#ffffff',
          backgroundColor: '#000000',
          border: false,
          renderRight: () => (
            <SideDrawer
              mode="magazine"
              container={portalRef.current}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          ),
        }}
      >
        <div className="relative h-full overflow-auto">
          <MagazineHeader />
          <LoungeAndMagazineTab<MagazineCategoryKey>
            tab="All"
            tabList={['All', 'MEDICINE', 'LIFE']}
            url="/api/post/magazine/list"
            queryKey="magazine"
          />
        </div>
      </AppScreen>

      <Portal />
    </AppLayout>
  )
}

const MagazineHeader = () => {
  return (
    <header className={cn('sticky top-[-248px] w-full bg-black')}>
      <div className="flex h-[248px] flex-col px-5 pt-25 pb-7.5 transition-all duration-500">
        <MagazineTitle
          titleClassName="text-gray07 text-subhead2 mt-4 mb-5"
          instagramClassName="text-body2 text-gray05"
        />
      </div>
    </header>
  )
}

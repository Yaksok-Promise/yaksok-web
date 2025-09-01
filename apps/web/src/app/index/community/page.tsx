import { LoungeAndMagazineTab } from '@/components/common/lounge-and-magazine-tab'
import { SideDrawer } from '@/components/common/side-drawer'
import { useGetToken } from '@/hooks/use-get-token'
import { Portal, usePortal } from '@/hooks/use-portal'
import { LoungeCategoryKey } from '@/utils/query-key'
import { AppScreen } from '@stackflow/plugin-basic-ui'

export default function CommunityPage() {
  useGetToken()
  const { portalRef, isOpen, setIsOpen } = usePortal()

  return (
    <>
      <AppScreen
        appBar={{
          title: '자유게시판',
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
          <LoungeAndMagazineTab<LoungeCategoryKey>
            tab="All"
            tabList={['All', 'QUESTION', 'REVIEW', 'DIALY']}
            url="/api/post/general-forum/list"
            queryKey="lounge"
          />
        </div>
      </AppScreen>

      <Portal />
    </>
  )
}

import AppLayout from '@/components/common/app-layout'
import { LoungeAndMagazineTab } from '@/components/common/lounge-and-magazine-tab'
import { SideDrawer } from '@/components/common/side-drawer'
import { LoungeCategoryKey } from '@/const/magazine-and-lounge'
import { Portal, usePortal } from '@/hooks/use-portal'
import { useUpdateToken } from '@/hooks/use-update-token'
import { useFlow } from '@/utils/stackflow'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { Pencil } from '@yaksok/icons'
import { Button } from '@yaksok/ui'

export default function GeneralForumPage() {
  useUpdateToken()
  const { portalRef, isOpen, setIsOpen } = usePortal()
  const { push } = useFlow()

  return (
    <AppLayout>
      <AppScreen
        appBar={{
          title: '자유게시판',
          textColor: '#ffffff',
          iconColor: '#ffffff',
          backgroundColor: '#000000',
          border: false,
          renderRight: () => (
            <SideDrawer
              mode="general-forum"
              container={portalRef.current}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          ),
        }}
      >
        <main className="relative overflow-auto scroll-auto">
          <LoungeAndMagazineTab<LoungeCategoryKey>
            tab="All"
            tabList={['All', 'QUESTION', 'REVIEW', 'DIALY']}
            url="/api/post/general-forum/list"
            queryKey="general-forum"
          />
          <div className="mb-5 flex items-center justify-center">
            <Button
              variant="default"
              size="fit"
              className="flex items-center justify-center gap-1 text-subhead1 shadow-box"
              onClick={() => {
                push('GeneralForumWritePage', {})
              }}
            >
              <Pencil size={20} />글 작성하기
            </Button>
          </div>
        </main>
      </AppScreen>

      <Portal />
    </AppLayout>
  )
}

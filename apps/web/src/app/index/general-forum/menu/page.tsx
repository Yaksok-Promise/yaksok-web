import AppLayout from '@/components/common/app-layout'
import { BottomsheetLikeBackground } from '@/components/common/bottomsheet-like-background'
import {
  GeneralForumAndMagazineMuneTab,
  LoungeAndMagazineMuneTab,
} from '@/components/common/lounge-and-magazine-mune-tab'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { useFlow } from '@stackflow/react/future'
import { ChevronLeft } from '@yaksok/icons'
type GeneralForumMenuPageProps = {
  params: {
    tab: LoungeAndMagazineMuneTab
  }
}

export default function GeneralForumMenuPage({
  params: { tab },
}: GeneralForumMenuPageProps) {
  const { pop } = useFlow()
  return (
    <AppLayout>
      <AppScreen
        appBar={{
          title: '',
          textColor: '#ffffff',
          iconColor: '#ffffff',
          backgroundColor: '#000000',
          border: false,
          backButton: {
            renderIcon: () => <ChevronLeft size={24} stroke="white" />,
            onClick: () => {
              pop()
            },
          },
        }}
      >
        <BottomsheetLikeBackground>
          <h1 className="px-5 pt-10 text-gray01 text-head6">자유게시판</h1>
          <GeneralForumAndMagazineMuneTab tab={tab} queryKey="general-forum" />
        </BottomsheetLikeBackground>
      </AppScreen>
    </AppLayout>
  )
}

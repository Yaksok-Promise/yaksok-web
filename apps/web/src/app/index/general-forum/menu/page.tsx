import { BottomsheetLikeBackground } from '@/components/common/bottomsheet-like-background'
import {
  GeneralForumAndMagazineMuneTab,
  LoungeAndMagazineMuneTab,
} from '@/components/common/lounge-and-magazine-mune-tab'
import { AppScreen } from '@stackflow/plugin-basic-ui'
type GeneralForumMenuPageProps = {
  params: {
    tab: LoungeAndMagazineMuneTab
  }
}

export default function GeneralForumMenuPage({
  params: { tab },
}: GeneralForumMenuPageProps) {
  return (
    <AppScreen
      appBar={{
        title: '',
        textColor: '#ffffff',
        iconColor: '#ffffff',
        backgroundColor: '#000000',
        border: false,
      }}
    >
      <BottomsheetLikeBackground>
        <h1 className="px-5 pt-10 text-gray01 text-head6">자유게시판</h1>
        <GeneralForumAndMagazineMuneTab tab={tab} queryKey="general-forum" />
      </BottomsheetLikeBackground>
    </AppScreen>
  )
}

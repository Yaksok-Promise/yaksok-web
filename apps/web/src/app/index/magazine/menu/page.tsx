import { BottomsheetLikeBackground } from '@/components/common/bottomsheet-like-background'
import {
  GeneralForumAndMagazineMuneTab,
  LoungeAndMagazineMuneTab,
} from '@/components/common/lounge-and-magazine-mune-tab'
import { AppScreen } from '@stackflow/plugin-basic-ui'
type MagazineMenuPageProps = {
  params: {
    tab: LoungeAndMagazineMuneTab
  }
}
export default function MagazineMenuPage({
  params: { tab },
}: MagazineMenuPageProps) {
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
        <h1 className="px-5 pt-10 text-gray01 text-head6">Yakin 메거진</h1>
        <GeneralForumAndMagazineMuneTab tab={tab} queryKey="magazine" />
      </BottomsheetLikeBackground>
    </AppScreen>
  )
}

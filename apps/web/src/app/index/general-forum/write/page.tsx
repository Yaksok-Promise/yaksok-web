import { GeneralForumWrite } from '@/components/general-forum/gener-forum-write'
import { GeneralForumCreateButton } from '@/components/general-forum/general-forum-create-button'
import { GeneralForumWriteSelect } from '@/components/general-forum/general-forum-write-select'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { useFlow } from '@stackflow/react/future'
import { ChevronLeft } from '@yaksok/icons'
import { TipTapContext } from '@yaksok/ui'

export default function GeneralForumWritePage() {
  const { pop } = useFlow()
  return (
    <TipTapContext>
      <AppScreen
        appBar={{
          title: <GeneralForumWriteSelect />,
          textColor: '#ffffff',
          iconColor: '#ffffff',
          backgroundColor: '#000000',
          border: false,
          renderRight: () => <GeneralForumCreateButton />,
          backButton: {
            renderIcon: () => <ChevronLeft size={24} stroke="white" />,
            onClick: () => {
              pop()
            },
          },
        }}
      >
        <div className="relative h-screen overflow-auto ">
          <GeneralForumWrite />
        </div>
      </AppScreen>
    </TipTapContext>
  )
}

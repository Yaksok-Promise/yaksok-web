import { GeneralForumWriteSelect } from '@/components/general-forum/general-forum-write-select'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { TipTapContext } from '@yaksok/ui'
import { ChevronLeft } from '@yaksok/icons'
import { GeneralForumEditButton } from '@/components/general-forum/general-forum-edit-button'
import { GeneralForumEdit } from '@/components/general-forum/general-forum-edit'

export type GeneralForumEditPageProps = {
  params: {
    body: string
  }
}

export default function GeneralForumEditPage({
  params: { body },
}: GeneralForumEditPageProps) {
  return (
    <TipTapContext>
      <AppScreen
        appBar={{
          title: <GeneralForumWriteSelect />,
          textColor: '#ffffff',
          iconColor: '#ffffff',
          backgroundColor: '#000000',
          border: false,
          renderRight: () => <GeneralForumEditButton />,
          renderLeft: () => (
            <button>
              <ChevronLeft size={24} stroke="white" />
            </button>
          ),
        }}
      >
        <div className="relative h-screen overflow-auto ">
          <GeneralForumEdit content={body} />
        </div>
      </AppScreen>
    </TipTapContext>
  )
}

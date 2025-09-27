import { GeneralForumEdit } from '@/components/general-forum/general-forum-edit'
import { GeneralForumEditButton } from '@/components/general-forum/general-forum-edit-button'
import { GeneralForumWriteSelect } from '@/components/general-forum/general-forum-write-select'
import { useFlow } from '@/utils/stackflow'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { ChevronLeft } from '@yaksok/icons'
import { useMagazineStore } from '@yaksok/store'
import { TipTapContext } from '@yaksok/ui'

export type GeneralForumEditPageProps = {
  params: {
    content: string
    id: string
  }
}

export default function GeneralForumEditPage({
  params: { content, id },
}: GeneralForumEditPageProps) {
  const { pop } = useFlow()
  const { clear } = useMagazineStore()
  return (
    <TipTapContext>
      <AppScreen
        appBar={{
          title: <GeneralForumWriteSelect />,
          textColor: '#ffffff',
          iconColor: '#ffffff',
          backgroundColor: '#000000',
          border: false,
          renderRight: () => <GeneralForumEditButton id={id} />,
          renderLeft: () => (
            <button
              onClick={() => {
                clear()
                pop()
              }}
            >
              <ChevronLeft size={24} stroke="white" />
            </button>
          ),
        }}
      >
        <div className="relative h-screen overflow-auto ">
          <GeneralForumEdit content={content} />
        </div>
      </AppScreen>
    </TipTapContext>
  )
}

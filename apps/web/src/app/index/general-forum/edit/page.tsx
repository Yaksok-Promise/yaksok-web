import AppLayout from '@/components/common/app-layout'
import { GeneralForumEdit } from '@/components/general-forum/general-forum-edit'
import { GeneralForumEditButton } from '@/components/general-forum/general-forum-edit-button'
import { GeneralForumWriteSelect } from '@/components/general-forum/general-forum-write-select'
import { useFlow } from '@/utils/stackflow'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { ChevronLeft } from '@yaksok/icons'
import { useMagazineStore } from '@yaksok/store'
import { TipTapContext } from '@yaksok/ui'
import { changeContent } from '@yaksok/ui/tiptap'

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
  const { clear, prevImages } = useMagazineStore()
  const newContent = changeContent(content, prevImages)
  return (
    <AppLayout>
      <TipTapContext>
        <AppScreen
          appBar={{
            title: <GeneralForumWriteSelect />,
            textColor: '#ffffff',
            iconColor: '#ffffff',
            backgroundColor: '#000000',
            border: false,
            renderRight: () => <GeneralForumEditButton id={id} />,
            backButton: {
              renderIcon: () => <ChevronLeft size={24} stroke="white" />,
              onClick: () => {
                clear()
                pop()
              },
            },
          }}
        >
          <div className="relative h-screen overflow-auto ">
            <GeneralForumEdit content={newContent} />
          </div>
        </AppScreen>
      </TipTapContext>
    </AppLayout>
  )
}

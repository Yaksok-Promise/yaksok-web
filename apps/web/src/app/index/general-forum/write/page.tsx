import { GeneralForumWrite } from '@/components/general-forum/gener-forum-write'
import { GeneralForumWriteSelect } from '@/components/general-forum/general-forum-write-select'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { Check, ChevronLeft } from '@yaksok/icons'
import { TipTapContext } from '@yaksok/ui'

export default function GeneralForumWritePage() {
  return (
    <TipTapContext>
      <AppScreen
        appBar={{
          title: <GeneralForumWriteSelect />,
          textColor: '#ffffff',
          iconColor: '#ffffff',
          backgroundColor: '#000000',
          border: false,
          renderRight: () => (
            <button>
              <Check size={24} stroke="white" />
            </button>
          ),
          renderLeft: () => (
            <button>
              <ChevronLeft size={24} stroke="white" />
            </button>
          ),
        }}
      >
        <div className="relative h-screen overflow-auto ">
          <GeneralForumWrite />
        </div>
      </AppScreen>
    </TipTapContext>
  )
}

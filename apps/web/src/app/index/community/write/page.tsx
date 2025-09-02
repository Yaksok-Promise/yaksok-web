import { AppScreen } from '@stackflow/plugin-basic-ui'
import { Check } from '@yaksok/icons'

export default function CommunityWritePage() {
  return (
    <>
      <AppScreen
        appBar={{
          title: <div>자유게시판</div>,
          textColor: '#ffffff',
          iconColor: '#ffffff',
          backgroundColor: '#000000',
          border: false,
          renderRight: () => (
            <button>
              <Check size={24} stroke="white" />
            </button>
          ),
        }}
      >
        <div className="relative h-screen overflow-auto "></div>
      </AppScreen>
    </>
  )
}

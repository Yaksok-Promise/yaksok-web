import { FeedbackPage } from '@/components/feedback/feedback-page'
import { useFlow } from '@/utils/stackflow'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { ChevronLeft } from '@yaksok/icons'

export default function GeneralForumFeedbackPage() {
  const { replace } = useFlow()
  return (
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
            replace('GeneralForumPage', {})
          },
        },
        closeButton: {
          renderIcon: () => <ChevronLeft size={24} stroke="white" />,
          onClick: () => {
            replace('GeneralForumPage', {})
          },
        },
      }}
    >
      <FeedbackPage />
    </AppScreen>
  )
}

import { useFlow } from '@/utils/stackflow'
import { Button } from '@yaksok/ui'
import { Modal } from '@yaksok/ui/modal'
import { LOCAL_STORAGE_KEY, removeItem } from '@yaksok/utils'
import { ModalProps } from '.'

export function LogoutModal({ closeModal, opened }: ModalProps) {
  const { push } = useFlow()
  const goSignin = () => {
    // 로직 실행
    removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
    removeItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN)
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: 'LOGOUT',
        })
      )
    }

    // route
    closeModal()
    push('SigninPage', {
      title: '로그인',
    })
  }

  return (
    <Modal opened={opened} hide={closeModal}>
      <Modal.Content>
        <h1 className="mb-9 whitespace-pre-line text-center text-body1">
          {'로그아웃할까요?'}
        </h1>
        <Button onClick={goSignin} size="full">
          확인
        </Button>
      </Modal.Content>
    </Modal>
  )
}

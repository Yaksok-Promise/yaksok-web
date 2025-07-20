import { useFlow } from '@/utils/stackflow'
import { Button } from '@yaksok/ui'
import { Modal } from '@yaksok/ui/modal'
import { ModalProps } from '.'

export function SignupModal({ closeModal, opened }: ModalProps) {
  const { push } = useFlow()
  const goSignup = () => {
    push('SignupPage', {
      title: '회원가입',
    })
  }

  return (
    <Modal opened={opened} hide={closeModal}>
      <Modal.Content>
        <h1 className="mb-9 whitespace-pre-line text-center text-body1">
          {'입력된 정보로 가입된 계정을\n 찾을 수 없습니다'}
        </h1>
        <button
          onClick={goSignup}
          className="mb-9 text-black01 text-subhead2 underline-offset-1"
        >
          바로 가입하러 가기
        </button>
        <Button onClick={closeModal} size="full">
          확인
        </Button>
      </Modal.Content>
    </Modal>
  )
}

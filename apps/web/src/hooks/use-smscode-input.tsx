import { useModal } from '@yaksok/ui/modal'
import { useState } from 'react'

export default function useSmscodeInput() {
  const [isShowCodeInput, setIsShowCodeInput] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const { openModal, closeModal, opened } = useModal()

  const handleVerifySent = () => {
    setIsShowCodeInput(true)
  }

  const handleVerifySuccess = () => {
    setIsSuccess(true)
    openModal()
  }

  const handleVerifyError = () => {
    setIsSuccess(false)
    openModal()
  }

  const handleCloseModal = () => {
    if (isSuccess) {
      closeModal()
    } else {
      closeModal()
    }
  }
  return {
    isShowCodeInput,
    isSuccess,
    setIsSuccess,
    handleVerifySent,
    handleVerifySuccess,
    handleVerifyError,
    handleCloseModal,
    opened,
  }
}

import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@yaksok/ui'
import { Modal, ModalProps, ModalRoot, useModal } from '@yaksok/ui/modal'

const meta: Meta<ModalProps> = {
  title: 'stories/modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  argTypes: {
    opened: {
      control: {
        type: 'boolean',
      },
    },
  },
} satisfies Meta<ModalProps>
export default meta

type Story = StoryObj<typeof Modal>

export const Primary: Story = {
  render: _props => {
    const { opened, openModal, closeModal } = useModal()
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Button onClick={openModal}>모달 열기</Button>
        <Modal opened={opened} hide={closeModal}>
          <Modal.Header hide={closeModal} />
          <Modal.Content>
            <div className="flex flex-col gap-9">
              <h1 className="text-body1">약사 복약 상담 신청이 마감되었어요</h1>
              <Button onClick={closeModal}>확인</Button>
            </div>
          </Modal.Content>
        </Modal>
        <ModalRoot />
      </div>
    )
  },
  name: 'Modal',
}

export const ModalReservation: Story = {
  render: _props => {
    const { opened, openModal, closeModal } = useModal()
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Button onClick={openModal}>모달 열기</Button>
        <Modal opened={opened} hide={closeModal}>
          <Modal.Header hide={closeModal} />
          <Modal.Content>
            <div className="flex flex-col items-center justify-center gap-1.5">
              <h1 className="text-head6">예약 정보</h1>
              <span className="text-caption1">
                아래 내용이 맞는지 확인해 주세요
              </span>
            </div>
            <div className="mt-4 flex flex-col gap-1">
              <div className="flex gap-3">
                <span className="text-caption1">예약 약국</span>
                <span className="text-body2">서울 건강약국</span>
              </div>
              <div className="flex gap-3">
                <span className="text-caption1">밤문 날짜 및 시간</span>
                <span className="text-body2">05.12 {'(월)'} | 13:00</span>
              </div>
              <div className="flex gap-3">
                <span className="text-caption1">예약 제품</span>
                <span className="text-body2">유한 비타민씨정 1000mg 01개</span>
              </div>
              <Button onClick={closeModal} className="mt-8">
                확인
              </Button>
            </div>
          </Modal.Content>
        </Modal>
        <ModalRoot />
      </div>
    )
  },
  name: 'Modal Reservation',
}

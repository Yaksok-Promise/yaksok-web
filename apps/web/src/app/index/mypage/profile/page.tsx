import { LogoutModal, QuitModal } from '@/components/common'
import ChangeNickname from '@/components/mypage/user-info/change-nickname'
import ChangePassword from '@/components/mypage/user-info/change-password'
import useGetMyInfo from '@/hooks/tanstak/use-get-my-info'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { Profile, TextField } from '@yaksok/ui'
import { ModalRoot, useModal } from '@yaksok/ui/modal'

export default function ProfilePage() {
  const {
    openModal: openLogoutModal,
    closeModal: closeLogoutModal,
    opened: openedLogoutModal,
  } = useModal()

  const {
    openModal: openQuitModal,
    closeModal: closeQuitModal,
    opened: openedQuitModal,
  } = useModal()

  const myInfo = useGetMyInfo()

  const logout = () => {
    openLogoutModal()
  }

  const quit = () => {
    openQuitModal()
  }
  return (
    <AppScreen
      appBar={{
        title: '회원 정보 수정',
        backgroundColor: '#fafafa',
        border: false,
      }}
    >
      <main className="flex flex-col bg-bgColor px-4 pt-2.5 pb-40">
        <div className="flex flex-col items-center pb-11">
          <Profile size={80} isCamera />
        </div>
        <div className="flex flex-col gap-5">
          <TextField
            label="이름"
            value={myInfo.data.name}
            disabled
            message={{}}
            regex={/\*/}
            mode="box"
          />
          <ChangeNickname nickname={myInfo.data.nickname} />
          <TextField
            label="아이디"
            value={myInfo.data.loginId}
            disabled
            message={{}}
            regex={/\*/}
            mode="box"
          />
          <ChangePassword />
          <TextField
            label="휴대폰 번호"
            value={myInfo.data.phoneNumber}
            disabled
            message={{}}
            regex={/\*/}
            mode="box"
          />
          <TextField
            label="성별"
            value={myInfo.data.gender}
            disabled
            message={{}}
            regex={/\*/}
            mode="box"
          />
          <TextField
            label="생년월일"
            value={myInfo.data.birthDate}
            disabled
            message={{}}
            regex={/\*/}
            mode="box"
          />
        </div>
        {/* biome-ignore lint/nursery/useSortedClasses: <explanation> */}
        <div className=" mt-10 flex w-full items-center justify-center divide-x divide-[rgba(99,99, 102, 0.20)]">
          <button className="px-6 text-body2 text-gray05" onClick={logout}>
            로그아웃
          </button>
          <button className="px-6 text-body2 text-red01" onClick={quit}>
            회원탈퇴
          </button>
        </div>
      </main>
      <LogoutModal opened={openedLogoutModal} closeModal={closeLogoutModal} />
      <QuitModal opened={openedQuitModal} closeModal={closeQuitModal} />
      <ModalRoot />
    </AppScreen>
  )
}

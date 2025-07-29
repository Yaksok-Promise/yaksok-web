import ChangeNickname from '@/components/mypage/user-info/change-nickname'
import ChangePassword from '@/components/mypage/user-info/change-password'
import { useHttpQuery } from '@/hooks/use-http-query'
import { QUERY_KEY } from '@/utils/query-key'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { UserInfoResponse } from '@yaksok/api/userType'
import { Profile, TextField } from '@yaksok/ui'
import { ModalRoot } from '@yaksok/ui/modal'
import { getItem, LOCAL_STORAGE_KEY } from '@yaksok/utils'

export default function ProfilePage() {
  const { data } = useHttpQuery<undefined, UserInfoResponse>(
    [QUERY_KEY.MY_INFO],
    '/api/user/info',
    {
      headers: {
        Authorization: `Bearer ${getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)}`,
      },
    }
  )
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
            value={data?.name}
            disabled
            message={{}}
            regex={/\*/}
            mode="box"
          />
          <ChangeNickname nickname={data?.nickname} />
          <TextField
            label="아이디"
            value={data?.loginId}
            disabled
            message={{}}
            regex={/\*/}
            mode="box"
          />
          <ChangePassword />
          <TextField
            label="휴대폰 번호"
            value={data?.phoneNumber}
            disabled
            message={{}}
            regex={/\*/}
            mode="box"
          />
          <TextField
            label="성별"
            value={data?.gender}
            disabled
            message={{}}
            regex={/\*/}
            mode="box"
          />
          <TextField
            label="생년월일"
            value={data?.birthDate}
            disabled
            message={{}}
            regex={/\*/}
            mode="box"
          />
        </div>
        {/* biome-ignore lint/nursery/useSortedClasses: <explanation> */}
        <div className=" mt-10 flex w-full items-center justify-center divide-x divide-[rgba(99,99, 102, 0.20)]">
          <button className="px-6 text-body2 text-gray05">로그아웃</button>
          <button className="px-6 text-body2 text-red01">회원탈퇴</button>
        </div>
      </main>
      <ModalRoot />
    </AppScreen>
  )
}

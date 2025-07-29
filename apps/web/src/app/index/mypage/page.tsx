import { Notification } from '@/components/common'
import { UserInfo } from '@/components/mypage'
import ListTitle from '@/components/mypage/main/list-title'
import { useHttpQuery } from '@/hooks/use-http-query'
import { QUERY_KEY } from '@/utils/query-key'
import { useFlow } from '@/utils/stackflow'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { UserInfoResponse } from '@yaksok/api/userType'
import { ListItem } from '@yaksok/ui'
import { LOCAL_STORAGE_KEY, getItem } from '@yaksok/utils'

export default function Mypage() {
  const { push } = useFlow()

  const goToEditProfile = () => {
    push('ProfilePage', {})
  }

  const userinfo = useHttpQuery<undefined, UserInfoResponse>(
    [QUERY_KEY.MY_INFO],
    '/api/user/info',
    {
      headers: {
        Authorization: `Bearer ${getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)}`,
      },
    }
  )

  console.log(userinfo.data)
  return (
    <AppScreen>
      <main className="flex flex-col bg-bgColor px-4 pb-40">
        <Notification wrapperClassName="flex h-16.5 items-center justify-end" />
        <UserInfo
          email={userinfo.data?.loginId}
          name={userinfo.data?.name}
          profileUrl={'https://via.placeholder.com/150'}
        />
        <div className="flex flex-col gap-10 pt-18">
          <div>
            <ListTitle title="나의 계정 정보" />
            <ListItem
              title="회원정보 수정"
              mode="line"
              color="black"
              navigate={goToEditProfile}
            />
            <ListItem title="위치 변경" mode="line" color="black" />
          </div>
          <div>
            <ListTitle title="나의 건강 관리" />
            <ListItem title="문진 기록 관리" mode="line" color="black" />
            <ListItem
              title="섭취중인 영양제∙일반의약품 관리"
              mode="line"
              color="black"
            />
          </div>
          <div>
            <ListTitle title="커뮤니티 관리" />
            <ListItem title="좋아요 한 글" mode="line" color="black" />
            <ListItem title="댓글 단 글" mode="line" color="black" />
            <ListItem title="스크랩한 글" mode="line" color="black" />
          </div>
          <div>
            <ListTitle title="결제 및 구독" />
            <ListItem title="결제 내역 확인" mode="line" color="black" />
            <ListItem title="결제 수단 확인" mode="line" color="black" />
            <ListItem title="구독 관리" mode="line" color="black" />
          </div>
          <div>
            <ListTitle title="설정 및 기타" />
            <ListItem title="알림 설정" mode="line" color="black" />
            <ListItem title="고객 센터" mode="line" color="black" />
          </div>
        </div>
      </main>
    </AppScreen>
  )
}

import CheckingMedicinePage from '@/app/index/checking-medicine/page'
import ComparePage from '@/app/index/compare/page'

import FindIdPassword from '@/app/index/find-id-password/page'
import GeneralForumDetailPage from '@/app/index/general-forum/detail/page'
import GeneralForumEditPage from '@/app/index/general-forum/edit/page'
import GeneralForumFeedbackPage from '@/app/index/general-forum/feedback/page'
import GeneralForumMenuPage from '@/app/index/general-forum/menu/page'
import GeneralForumPage from '@/app/index/general-forum/page'
import GeneralForumWritePage from '@/app/index/general-forum/write/page'
import MagazineDetailPage from '@/app/index/magazine/detail/page'
import MagazineFeedbackPage from '@/app/index/magazine/feedback/page'
import MagazineListPage from '@/app/index/magazine/list/page'
import MagazineMenuPage from '@/app/index/magazine/menu/page'
import MagazinePage from '@/app/index/magazine/page'
import MagazineYakinStoryPage from '@/app/index/magazine/yakin-story/page'
import Mypage from '@/app/index/mypage/page'
import ProfilePage from '@/app/index/mypage/profile/page'
import MainPage from '@/app/index/page'
import SigninPage from '@/app/index/signin/page'
import SignupPage from '@/app/index/signup/page'
import AppLayout from '@/components/common/app-layout'
import { PaymentBottomSheetActivity } from '@/components/common/bottomsheet'
import { basicUIPlugin } from '@stackflow/plugin-basic-ui'
import { historySyncPlugin } from '@stackflow/plugin-history-sync'
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic'
import { stackflow } from '@stackflow/react'
import { isBottomStackPage } from '@yaksok/store'
import { JSX } from 'react'

const ROUTES = {
  MainPage: '/',
  ComparePage: '/compare',
  SignupPage: '/signup',
  SigninPage: '/signin',
  FindIdPassword: '/find-id-password',
  Mypage: '/mypage', // 마이페이지
  ProfilePage: '/mypage/profile',
  PaymentBottomSheetActivity: '/payment-bottom-sheet', //bottomeSheet 컴포넌트 페이지화
  MagazinePage: '/magazine', // 라운지 관련 페이지
  MagazineDetailPage: '/magazine/detail',
  MagazineListPage: '/magazine/list',
  MagazineYakinStoryPage: '/magazine/yakin-story',
  MagazineMenuPage: '/magazine/menu',
  MagazineFeedbackPage: '/magazine/feedback',
  GeneralForumPage: '/general-forum', //   커뮤니티
  GeneralForumWritePage: '/general-forum/write',
  GeneralForumDetailPage: '/general-forum/detail',
  GeneralForumEditPage: '/general-forum/edit',
  GeneralForumMenuPage: '/general-forum/menu',
  GeneralForumFeedbackPage: '/general-forum/feedback',
  CheckingMedicinePage: '/checking-medicine', // 약 재고 조회
} as const

export type RoutesKey = keyof typeof ROUTES

type AnyProps = JSX.IntrinsicAttributes & Record<string, unknown>

function withLayout<P extends AnyProps>(
  Component: React.ComponentType<P>
): React.ComponentType<P> {
  const Wrapped: React.FC<P> = props => (
    <AppLayout>
      <Component {...props} />
    </AppLayout>
  )
  Wrapped.displayName = `withLayout(${Component.displayName ?? Component.name ?? 'Component'})`
  return isBottomStackPage(Component.name) ? Wrapped : Component
}

export const { Stack, useFlow } = stackflow({
  transitionDuration: 350,
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino',
    }),
    historySyncPlugin({
      routes: ROUTES,
      fallbackActivity: () => 'MainPage',
    }),
  ],
  activities: {
    MainPage: withLayout(MainPage),
    ComparePage: withLayout(ComparePage),
    SignupPage,
    SigninPage,
    FindIdPassword,
    Mypage: withLayout(Mypage),
    ProfilePage: withLayout(ProfilePage),
    PaymentBottomSheetActivity,
    MagazinePage: withLayout(MagazinePage),
    MagazineListPage: MagazineListPage,
    MagazineDetailPage: MagazineDetailPage,
    MagazineMenuPage: MagazineMenuPage,
    MagazineYakinStoryPage: MagazineYakinStoryPage,
    MagazineFeedbackPage: MagazineFeedbackPage,
    GeneralForumPage: withLayout(GeneralForumPage),
    GeneralForumWritePage: GeneralForumWritePage,
    GeneralForumDetailPage: GeneralForumDetailPage,
    GeneralForumMenuPage: withLayout(GeneralForumMenuPage),
    GeneralForumEditPage: GeneralForumEditPage,
    GeneralForumFeedbackPage: withLayout(GeneralForumFeedbackPage),
    CheckingMedicinePage: withLayout(CheckingMedicinePage),
  },
  initialActivity: () => 'MainPage',
})

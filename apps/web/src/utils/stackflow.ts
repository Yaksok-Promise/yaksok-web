import CheckingMedicinePage from '@/app/index/checking-medicine/page'
import ComparePage from '@/app/index/compare/page'
import FeedbackPage from '@/app/index/feedback/feedback-page'
import FindIdPassword from '@/app/index/find-id-password/page'
import GeneralForumDetailPage from '@/app/index/general-forum/detail/page'
import GeneralForumEditPage from '@/app/index/general-forum/edit/page'
import GeneralForumMenuPage from '@/app/index/general-forum/menu/page'
import GeneralForumPage from '@/app/index/general-forum/page'
import GeneralForumWritePage from '@/app/index/general-forum/write/page'
import MagazineDetailPage from '@/app/index/magazine/detail/page'
import MagazineListPage from '@/app/index/magazine/list/page'
import MagazinePage from '@/app/index/magazine/page'
import MagazineMenuPage from '@/app/index/magazine/menu/page'
import MagazineYakinStoryPage from '@/app/index/magazine/yakin-story/page'
import Mypage from '@/app/index/mypage/page'
import ProfilePage from '@/app/index/mypage/profile/page'
import MainPage from '@/app/index/page'
import SigninPage from '@/app/index/signin/page'
import SignupPage from '@/app/index/signup/page'
import { PaymentBottomSheetActivity } from '@/components/common/bottomsheet'
import { basicUIPlugin } from '@stackflow/plugin-basic-ui'
import { historySyncPlugin } from '@stackflow/plugin-history-sync'
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic'
import { stackflow } from '@stackflow/react'

export const { Stack, useFlow } = stackflow({
  transitionDuration: 350,
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino',
    }),
    historySyncPlugin({
      routes: {
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
        GeneralForumPage: '/general-forum', // 자유게시판 tab 관련 페이지
        GeneralForumWritePage: '/general-forum/write',
        GeneralForumDetailPage: '/general-forum/detail',
        GeneralForumEditPage: '/general-forum/edit',
        GeneralForumMenuPage: '/general-forum/menu',
        FeedbackPage: '/feedback', // 문의 사항
        CheckingMedicinePage: '/checking-medicine', // 약 재고 조회
      },
      fallbackActivity: () => 'MainPage',
    }),
  ],
  activities: {
    MainPage,
    ComparePage,
    SignupPage,
    SigninPage,
    FindIdPassword,
    Mypage,
    ProfilePage,
    PaymentBottomSheetActivity,
    MagazinePage,
    MagazineListPage,
    MagazineDetailPage,
    MagazineMenuPage,
    MagazineYakinStoryPage,
    GeneralForumPage,
    GeneralForumWritePage,
    GeneralForumDetailPage,
    GeneralForumMenuPage,
    GeneralForumEditPage,
    FeedbackPage,
    CheckingMedicinePage,
  },
  initialActivity: () => 'MainPage',
})

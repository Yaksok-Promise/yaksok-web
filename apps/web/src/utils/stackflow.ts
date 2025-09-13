import ComparePage from '@/app/index/compare/page'
import FindIdPassword from '@/app/index/find-id-password/page'
import GeneralForumDetailPage from '@/app/index/general-forum/detail/page'
import GeneralForumMenuPage from '@/app/index/general-forum/menu/page'
import GeneralForumPage from '@/app/index/general-forum/page'
import GeneralForumWritePage from '@/app/index/general-forum/write/page'
import MagazineDetailPage from '@/app/index/magazine/detail/page'
import MagazineListPage from '@/app/index/magazine/list/page'
import MagazinePage from '@/app/index/magazine/list/page'
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
        Mypage: '/mypage',
        ProfilePage: '/mypage/profile',
        PaymentBottomSheetActivity: '/payment-bottom-sheet',
        MagazinePage: '/magazine',
        MagazineDetailPage: '/magazine/detail',
        MagazineListPage: '/magazine/list',
        MagazineYakinStoryPage: '/magazine/yakin-story',
        GeneralForumPage: '/general-forum',
        GeneralForumWritePage: '/general-forum/write',
        GeneralForumDetailPage: '/general-forum/detail',
        MagazineMenuPage: '/magazine/menu',
        GeneralForumMenuPage: '/general-forum/menu',
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
  },
  initialActivity: () => 'MainPage',
})

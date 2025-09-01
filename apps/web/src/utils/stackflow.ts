import CommunityPage from '@/app/index/community/page'
import ComparePage from '@/app/index/compare/page'
import FindIdPassword from '@/app/index/find-id-password/page'
import MagazinePage from '@/app/index/lounge/magazine/page'
import LoungePage from '@/app/index/lounge/page'
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
        LoungePage: '/lounge',
        MagazinePage: '/lounge/magazine',
        CommunityPage: '/community',
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
    LoungePage,
    MagazinePage,
    CommunityPage,
  },
  initialActivity: () => 'MainPage',
})

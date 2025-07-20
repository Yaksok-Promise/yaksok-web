import ComparePage from '@/app/index/compare/page'
import MainPage from '@/app/index/page'
import Signin from '@/app/index/signin/page'
import SignupPage from '@/app/index/signup/page'
import FindIdPassword from '@/app/index/find-id-password/page'
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
        Signin: '/signin',
        FindIdPassword: '/find-id-password',
      },
      fallbackActivity: () => 'MainPage',
    }),
  ],
  activities: {
    MainPage,
    ComparePage,
    SignupPage,
    Signin,
    FindIdPassword,
  },
  initialActivity: () => 'MainPage',
})

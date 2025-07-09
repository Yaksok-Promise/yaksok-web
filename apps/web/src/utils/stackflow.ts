import ComparePage from '@/app/index/compare/page'
import MainPage from '@/app/index/page'
import Signin from '@/app/index/signin/page'
import SignupPage from '@/app/index/signup/page'
import { basicUIPlugin } from '@stackflow/plugin-basic-ui'
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic'
import { stackflow } from '@stackflow/react'

export const { Stack, useFlow } = stackflow({
  transitionDuration: 350,
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino',
    }),
  ],
  activities: {
    MainPage,
    ComparePage,
    SignupPage,
    Signin,
  },
  initialActivity: () => 'MainPage',
})

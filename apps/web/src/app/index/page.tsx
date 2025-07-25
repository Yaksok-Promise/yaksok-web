import BellIcon from '@/assets/icons/bell-icon'
import LogoIcon from '@/assets/icons/logo-icon'
import Counsel from '@/components/main/counsel'
import MagazineCarousel from '@/components/main/magazine-carousel'
import { MainCheck } from '@/components/main/main-check'
import { MainLounge } from '@/components/main/main-lounge'
import { useFlow } from '@/utils/stackflow'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { Footer, Search } from '@yaksok/ui'

export default function MainPage() {
  const { push } = useFlow()

  const _onClick = () => {
    push('ComparePage', {
      title: '성분 비교하기',
    })
  }

  const _goSignup = () => {
    push('SignupPage', {
      title: '회원가입',
    })
  }

  const _goSignin = () => {
    push('Signin', {
      title: '로그인',
    })
  }

  return (
    <AppScreen
      appBar={{
        title: '',
        renderLeft: () => (
          <div>
            <LogoIcon />
          </div>
        ),
        backgroundColor: '#fafafa',
        border: false,
        renderRight: () => {
          return (
            <div className="flex gap-[10px]">
              <BellIcon />
            </div>
          )
        },
      }}
    >
      <div className="flex flex-col gap-14 bg-bgColor py-6">
        <Search containerClassName="px-3" />
        <MainLounge />
        <MainCheck />
        <Counsel />
        <MagazineCarousel />
      </div>
      <Footer />
    </AppScreen>
  )
}

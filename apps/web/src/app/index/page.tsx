import LogoIcon from '@/assets/icons/logo-icon'
import { Notification } from '@/components/common'
import Counsel from '@/components/main/counsel'
import MagazineCarousel from '@/components/main/magazine-carousel'
import { MainCheck } from '@/components/main/main-check'
import { MainLounge } from '@/components/main/main-lounge'
import { useGetToken } from '@/hooks/use-get-token'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { Footer, Search } from '@yaksok/ui'

export default function MainPage() {
  useGetToken()

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
          return <Notification wrapperClassName="flex gap-2.5" />
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

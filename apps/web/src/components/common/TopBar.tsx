import BellIcon from '@/assets/icons/bell-icon'
import LogoIcon from '@/assets/icons/logo-icon'
import PersonIcon from '@/assets/icons/person-icon'

export default function TopBar() {
  return (
    <header className="absolute top-0 flex w-full items-center justify-between bg-bgColor px-[16px] py-[21px]">
      <LogoIcon />
      <div className="flex gap-[10px]">
        <BellIcon />
        <PersonIcon />
      </div>
    </header>
  )
}

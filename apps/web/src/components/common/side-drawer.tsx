import { MagazineOrGeneralForum } from '@/const/magazine-and-lounge'
import useGetMyInfo from '@/hooks/tanstak/use-get-my-info'
import { useFlow } from '@/utils/stackflow'
import {
  Attach,
  Bell,
  BlankHeart,
  Bookmark,
  ChevronRight,
  CommunicationDot,
  Hamburger,
  Info,
  Instagram,
  Mail,
  Show,
} from '@yaksok/icons'
import { Comment, ListItem, Profile, Switch } from '@yaksok/ui'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from '@yaksok/ui/drawer'

import React, { forwardRef } from 'react'

export type SideDrawerProps = {
  mode: MagazineOrGeneralForum
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  container: HTMLDivElement | null
}

export const SideDrawer = forwardRef(function SideDrawer(
  { isOpen, setIsOpen, container, mode }: SideDrawerProps,
  _ref: React.Ref<HTMLDivElement>
) {
  const { data } = useGetMyInfo()

  const { push } = useFlow()
  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
      direction="right"
      modal={false}
      container={container}
    >
      <DrawerTrigger asChild>
        <Hamburger size={20} stroke={'white'} />
      </DrawerTrigger>
      <DrawerPortal>
        <div
          onClick={e => {
            e.stopPropagation()
            setIsOpen(false)
          }}
          className={[
            'fixed inset-0 z-[60] bg-black/40 transition-opacity duration-200',
            isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
          ].join(' ')}
        />
        <DrawerContent className="z-[70] rounded-tl-[20px]">
          <DrawerHeader className="mt-[25%]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Profile size={40} />
                <DrawerTitle className="text-black01 text-head6">
                  {data.name} 님
                </DrawerTitle>
              </div>
              <button
                onClick={() => {
                  push('Mypage', {})
                  setIsOpen(false)
                }}
              >
                <ChevronRight size={28} stroke={'#C4C4C4'} />
              </button>
            </div>
          </DrawerHeader>
          <div className="mt-7 flex flex-col gap-2 px-3">
            <Line />
            <ListItem
              navigate={() => {
                if (mode === 'magazine') {
                  push('MagazineMenuPage', { tab: 'LIKE' })
                } else {
                  push('GeneralForumMenuPage', { tab: 'LIKE' })
                }
                setIsOpen(false)
              }}
              icon={<BlankHeart size={18} />}
              title={'좋아요 한 글'}
              className="text-black01 text-body2"
            />
            <ListItem
              navigate={() => {
                if (mode === 'magazine') {
                  push('MagazineMenuPage', { tab: 'BOOKMARK' })
                } else {
                  push('GeneralForumMenuPage', { tab: 'BOOKMARK' })
                }
                setIsOpen(false)
              }}
              icon={<Bookmark size={18} />}
              title={'스크랩 한 글'}
              className="text-black01 text-body2"
            />
            {mode === 'general-forum' && (
              <ListItem
                navigate={() => {
                  push('GeneralForumMenuPage', { tab: 'COMMENT' })
                  setIsOpen(false)
                }}
                icon={<CommunicationDot size={18} stroke={'#000000'} />}
                title={'댓글 단 글'}
                className="text-black01 text-body2"
              />
            )}
            {mode === 'general-forum' && (
              <ListItem
                navigate={() => {
                  push('GeneralForumMenuPage', { tab: 'MINE' })
                  setIsOpen(false)
                }}
                icon={<Show size={18} stroke={'#000000'} />}
                title={'작성 한 글'}
                className="text-black01 text-body2"
              />
            )}
            <Line />
            <ListItem
              icon={<Bell size={18} stroke={'#000000'} />}
              title={'새 글 알림'}
              className="text-black01 text-body2"
              rightIcon={<Switch />}
            />
            <ListItem
              icon={<Attach size={18} />}
              title={'YAKIN STORY'}
              className="text-black01 text-body2"
            />
            <ListItem
              icon={<Instagram size={18} />}
              title={'Instagram'}
              className="text-black01 text-body2"
            />
            <Line />
            <ListItem
              icon={<Mail size={18} />}
              title={'피드백・문의'}
              className="text-black01 text-body2"
            />
            <Line />
            <ListItem
              icon={<Info size={18} />}
              title={'이용약관 및 개인정보 처리방침'}
              className="text-body2 text-gray03"
            />
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  )
})

const Line = () => <div className="h-[1px] w-full bg-gray03 opacity-20" />

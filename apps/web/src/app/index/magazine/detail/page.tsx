import { SideDrawer } from '@/components/common/side-drawer'
import { MagazineDetailFooter } from '@/components/magazine/magazine-detail-footer'
import { MagazineDetailHead } from '@/components/magazine/magazine-detail-head'
import { MagazineFloatingButton } from '@/components/magazine/magazine-floating-button'
import { useHttpQuery } from '@/hooks/tanstak/use-http-query'
import { useGetToken } from '@/hooks/use-get-token'
import { Portal, usePortal } from '@/hooks/use-portal'
import { useUpdateToken } from '@/hooks/use-update-token'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { MagazineDetail } from '@yaksok/api/boardMagazineType'

import { useInView } from 'react-intersection-observer'

type LoungeDetailPageProps = {
  params: {
    id: string
  }
}

export default function MagazineDetailPage({
  params: { id },
}: LoungeDetailPageProps) {
  useUpdateToken()
  const { portalRef, isOpen, setIsOpen } = usePortal()
  const { ref, inView } = useInView({
    threshold: 0.9,
    onChange: inView => {
      console.log(inView)
    },
  })

  const token = useGetToken()
  const result = useHttpQuery<undefined, MagazineDetail>(
    ['magazine', id],
    '/api/post/magazine/{postId}',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        postId: id,
      },
    }
  )

  const data = result.data
  console.log(data)

  const headProps = {
    likes: data.likes,
    views: data.views,
    date: data.createdAt,
    title: data.title,
    tags: data.tags,
  }

  return (
    <>
      <AppScreen
        appBar={{
          title: '메거진',
          textColor: '#ffffff',
          iconColor: '#ffffff',
          backgroundColor: '#000000',
          border: false,
          renderRight: () => (
            <SideDrawer
              container={portalRef.current}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          ),
        }}
      >
        <main className="flex flex-col bg-white pb-10">
          <MagazineDetailHead {...headProps} />
          <div className="h-[3000px]">{data.body}</div>
        </main>
        <MagazineDetailFooter ref={ref} />
        <MagazineFloatingButton inView={inView} magazineId={id} />
      </AppScreen>
      <Portal />
    </>
  )
}

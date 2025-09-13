import { MagazineOrGeneralForum } from '@/const/magazine-and-lounge'
import { useHttpInfiniteQuery } from '@/hooks/tanstak/use-http-infinity-query'
import { useGetToken } from '@/hooks/use-get-token'
import { useFlow } from '@/utils/stackflow'
import { useQueryClient } from '@tanstack/react-query'
import { PathType } from '@yaksok/api'
import { Magazine } from '@yaksok/api/boardMagazineType'
import { MagazineListCard } from '@yaksok/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@yaksok/ui/tabs'
import { Suspense, useState } from 'react'
import { useInView } from 'react-intersection-observer'

type Tab = 'LIKE' | 'BOOKMARK' | 'COMMENT' | 'MINE'

type LoungeAndMagazineMuneTabProps = {
  tab: Tab
  queryKey: MagazineOrGeneralForum
}
export const GeneralForumAndMagazineMuneTab = ({
  tab,
  queryKey,
}: LoungeAndMagazineMuneTabProps) => {
  const [value, setValue] = useState<'LIKE' | 'BOOKMARK' | 'COMMENT' | 'MINE'>(
    tab
  )
  const queryClient = useQueryClient()
  const changeCategory = (value: string) => {
    setValue(value as Tab)
    queryClient.invalidateQueries({ queryKey: [queryKey, value] })
  }

  const tabList =
    queryKey === 'magazine'
      ? ['LIKE', 'BOOKMARK']
      : ['LIKE', 'BOOKMARK', 'COMMENT', 'MINE']

  const tabListToKorean = {
    LIKE: '좋아요 한 글',
    BOOKMARK: '스크랩 한 글',
    COMMENT: '댓글 단 글',
    MINE: '작성한 글',
  }
  return (
    <Tabs
      orientation="horizontal"
      value={value}
      onValueChange={changeCategory}
      className="rounded-t-full bg-white px-5"
    >
      <TabsList className="sticky top-0 flex w-full justify-between rounded-none bg-white">
        <div>
          {tabList.map(tab => (
            <TabsTrigger
              key={tab}
              value={tab}
              variant={'box'}
              className="mt-4 mb-4 not-first:ml-2.5"
            >
              {tabListToKorean[tab as keyof typeof tabListToKorean]}
            </TabsTrigger>
          ))}
        </div>
      </TabsList>
      <TabsContent value={value} className="mb-10">
        <Suspense fallback={<div>Loading...</div>}>
          <LoungeAndMagazineListItem queryKey={queryKey} value={value} />
        </Suspense>
      </TabsContent>
    </Tabs>
  )
}

type LoungeAndMagazineListItemProps = {
  queryKey: MagazineOrGeneralForum
  value: Tab
}
function LoungeAndMagazineListItem({
  queryKey,
  value,
}: LoungeAndMagazineListItemProps) {
  const { push } = useFlow()
  const params = {
    size: 10,
    bodySize: 50,
  }

  // 추가 설정 필요
  let url: PathType | null = '/api/post/general-forum/my'

  if (queryKey === 'general-forum' && value === 'MINE') {
    url = '/api/post/general-forum/my'
  }
  const token = useGetToken()

  const { items, hasNextPage, fetchNextPage } = useHttpInfiniteQuery<
    undefined,
    Magazine
  >(
    [queryKey, value],
    url,
    {
      params: params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    {}
  )

  const { ref } = useInView({
    threshold: 0,
    onChange: inView => {
      if (inView && hasNextPage) {
        fetchNextPage()
      }
    },
  })

  const onClick = (id: string) => {
    const isMagazine = queryKey === 'magazine'
    push(isMagazine ? 'MagazineDetailPage' : 'GeneralForumDetailPage', { id })
  }

  return (
    <div>
      {items.map(item => (
        <MagazineListCard
          key={item.id}
          data={item}
          onClick={e => {
            e.stopPropagation()
            onClick(item.id)
          }}
        />
      ))}
      <div ref={ref} />
    </div>
  )
}

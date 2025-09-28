import { MagazineOrGeneralForum } from '@/const/magazine-and-lounge'
import { useHttpInfiniteQuery } from '@/hooks/tanstak/use-http-infinity-query'
import { useGetToken } from '@/hooks/use-get-token'
import { useFlow } from '@/utils/stackflow'
import { useQueryClient } from '@tanstack/react-query'
import { PathType } from '@yaksok/api'
import { Magazine } from '@yaksok/api/boardMagazineType'
import { Button, MagazineListCard } from '@yaksok/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@yaksok/ui/tabs'
import { Suspense, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export type LoungeAndMagazineMuneTab = 'LIKE' | 'SCRAPED' | 'COMMENT' | 'MINE'

type LoungeAndMagazineMuneTabProps = {
  tab: LoungeAndMagazineMuneTab
  queryKey: MagazineOrGeneralForum
}

const TAB_LIST_TO_KOREAN = {
  LIKE: '좋아요 한 글',
  SCRAPED: '스크랩 한 글',
  COMMENT: '댓글 단 글',
  MINE: '작성한 글',
} as const
export const GeneralForumAndMagazineMuneTab = ({
  tab,
  queryKey,
}: LoungeAndMagazineMuneTabProps) => {
  const [tabValue, setTabValue] = useState<
    'LIKE' | 'SCRAPED' | 'COMMENT' | 'MINE'
  >(tab)
  const queryClient = useQueryClient()
  const changeCategory = (value: string) => {
    setTabValue(value as LoungeAndMagazineMuneTab)
    queryClient.invalidateQueries({ queryKey: [queryKey, value] })
  }

  const tabList =
    queryKey === 'magazine'
      ? ['LIKE', 'SCRAPED']
      : ['LIKE', 'SCRAPED', 'COMMENT', 'MINE']

  return (
    <Tabs
      orientation="horizontal"
      value={tabValue}
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
              {TAB_LIST_TO_KOREAN[tab as keyof typeof TAB_LIST_TO_KOREAN]}
            </TabsTrigger>
          ))}
        </div>
      </TabsList>
      <TabsContent value={tabValue} className="mb-10">
        <Suspense fallback={<div>Loading...</div>}>
          <LoungeAndMagazineListItem queryKey={queryKey} tabValue={tabValue} />
        </Suspense>
      </TabsContent>
    </Tabs>
  )
}

type LoungeAndMagazineListItemProps = {
  queryKey: MagazineOrGeneralForum
  tabValue: LoungeAndMagazineMuneTab
}
function LoungeAndMagazineListItem({
  queryKey,
  tabValue,
}: LoungeAndMagazineListItemProps) {
  const { push } = useFlow()
  const params = {
    size: 10,
    bodySize: 50,
  }

  // 추가 설정 필요
  let url: PathType | null = '/api/post/general-forum/my'

  if (queryKey === 'general-forum') {
    if (tabValue === 'MINE') {
      url = '/api/post/general-forum/my'
    } else if (tabValue === 'LIKE') {
      url = '/api/post/general-forum/my/liked'
    } else if (tabValue === 'SCRAPED') {
      url = '/api/post/general-forum/my/scrapped'
    } else if (tabValue === 'COMMENT') {
      url = '/api/post/general-forum/my/commented'
    }
  }

  if (queryKey === 'magazine') {
    if (tabValue === 'LIKE') {
      url = '/api/post/magazine/my/liked'
    } else if (tabValue === 'SCRAPED') {
      url = '/api/post/magazine/my/scrapped'
    }
  }

  const token = useGetToken()

  const { items, hasNextPage, fetchNextPage } = useHttpInfiniteQuery<
    undefined,
    Magazine
  >(
    [queryKey, tabValue],
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

  const navigate = (id: string) => {
    const isMagazine = queryKey === 'magazine'
    push(isMagazine ? 'MagazineDetailPage' : 'GeneralForumDetailPage', { id })
  }

  if (items.length === 0) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-white pt-10">
        <h1 className="text-gray03 text-head6">
          {TAB_LIST_TO_KOREAN[tabValue as keyof typeof TAB_LIST_TO_KOREAN]}한
          글이 없습니다.
        </h1>
        <p className="pb-11 text-body2 text-gray05">
          {'회원들의 최신 글을 만나보세요 :)'}
        </p>
        <Button
          onClick={() => {
            push(
              queryKey === 'magazine' ? 'MagazinePage' : 'GeneralForumPage',
              {}
            )
          }}
        >
          {queryKey === 'magazine' ? '메거진 바로가기' : '자유게시판 바로가기'}
        </Button>
      </div>
    )
  }

  return (
    <div>
      {items.map(item => (
        <MagazineListCard
          key={item.id}
          data={item}
          onClick={e => {
            e.stopPropagation()
            navigate(item.id)
          }}
          liked={tabValue === 'LIKE'}
          scrapped={tabValue === 'SCRAPED'}
          isDelete={tabValue === 'MINE' || tabValue === 'SCRAPED'}
        />
      ))}
      <div ref={ref} />
    </div>
  )
}

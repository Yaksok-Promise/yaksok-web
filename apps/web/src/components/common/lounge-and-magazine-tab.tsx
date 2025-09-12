import {
  LOUNGE_CATEGORY,
  LoungeCategoryKey,
  MAGAZINE_CATEGORY,
  MagazineCategoryKey,
  MagazineOrGeneralForum,
} from '@/const/magazine-and-lounge'
import { useHttpInfiniteQuery } from '@/hooks/tanstak/use-http-infinity-query'
import { useFlow } from '@/utils/stackflow'
import { useQueryClient } from '@tanstack/react-query'
import { PathType } from '@yaksok/api'
import { Magazine } from '@yaksok/api/boardMagazineType'
import { MagazineListCard } from '@yaksok/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@yaksok/ui/tabs'
import { Suspense, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import LoungeMagazineSelect from './lounge-magazine-select'
import {
  useGeneralForumLikeOptimistic,
  useMagazineLikeOptimistic,
} from '@/hooks/tanstak/use-optimistic-like'

export type LoungeAndMagazineTabProps<T extends string> = {
  tab: T
  tabList: T[]
  url: PathType
  queryKey: MagazineOrGeneralForum
}

const isMagazine = (queryKey: MagazineOrGeneralForum): queryKey is 'magazine' =>
  queryKey === 'magazine'

export function LoungeAndMagazineTab<T extends string>({
  tab,
  tabList,
  url,
  queryKey,
}: LoungeAndMagazineTabProps<T>) {
  const queryClient = useQueryClient()
  const [category, setCategory] = useState<T>(tab)
  const [sort, setSort] = useState<'LATEST' | 'POPULAR'>('LATEST')

  const changeCategory = (category: string) => {
    setCategory(category as T)
    queryClient.invalidateQueries({ queryKey: [queryKey, category, sort] })
  }

  return (
    <Tabs
      orientation="horizontal"
      value={category}
      onValueChange={changeCategory}
      className="bg-white px-5"
    >
      <TabsList className="sticky top-0 flex w-full justify-between rounded-none bg-white">
        <div>
          {tabList.map(tab => (
            <TabsTrigger
              key={tab}
              value={tab}
              variant={'line'}
              className="mt-4 mb-4 not-first:ml-2.5"
            >
              {isMagazine(queryKey)
                ? MAGAZINE_CATEGORY[tab as MagazineCategoryKey]
                : LOUNGE_CATEGORY[tab as LoungeCategoryKey]}
            </TabsTrigger>
          ))}
        </div>
        <LoungeMagazineSelect value={sort} onValueChange={setSort} />
      </TabsList>
      <TabsContent value={category} className="mb-10">
        <Suspense fallback={<div>Loading...</div>}>
          <LoungeAndMagazineListItem
            queryKey={queryKey}
            category={category}
            sort={sort}
            url={url}
          />
        </Suspense>
      </TabsContent>
    </Tabs>
  )
}

type LoungeAndMagazineListItemProps = {
  queryKey: MagazineOrGeneralForum
  category: string
  sort: string
  url: PathType
}
function LoungeAndMagazineListItem({
  queryKey,
  category,
  sort,
  url,
}: LoungeAndMagazineListItemProps) {
  const { push } = useFlow()
  const params = {
    size: 10,
    category: category === 'All' ? undefined : category,
    sortBy: sort,
  }

  const { items, hasNextPage, fetchNextPage } = useHttpInfiniteQuery<
    undefined,
    Magazine
  >([queryKey, category, sort], url, {
    params: params,
  })

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
        <MagazineListCardWithLike
          key={item.id}
          data={item}
          onClick={e => {
            e.stopPropagation()
            onClick(item.id)
          }}
          queryKey={queryKey}
        />
      ))}
      <div ref={ref} />
    </div>
  )
}

type MagazineListCardWithLikeProps = {
  data: Magazine
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void
  queryKey: MagazineOrGeneralForum
}
const MagazineListCardWithLike = ({
  data,
  onClick,
  queryKey,
}: MagazineListCardWithLikeProps) => {
  const likeGeneralForum = useGeneralForumLikeOptimistic(data.id)

  const likeMagazine = useMagazineLikeOptimistic(data.id)

  const clickLike = () => {
    if (queryKey === 'magazine') {
      likeMagazine.handleLike()
    } else {
      likeGeneralForum.handleLike()
    }
  }

  const clickBookmark = (id: string) => {
    console.log('clickBookmark', id)
  }

  return (
    <MagazineListCard
      data={data}
      onClick={onClick}
      onClickLike={clickLike}
      onClickBookmark={clickBookmark}
    />
  )
}

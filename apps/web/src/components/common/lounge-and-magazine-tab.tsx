import { useHttpInfiniteQuery } from '@/hooks/tanstak/use-http-infinity-query'
import {
  LOUNGE_CATEGORY,
  LoungeCategoryKey,
  MAGAZINE_CATEGORY,
  MagazineCategoryKey,
} from '@/utils/query-key'
import { useQueryClient } from '@tanstack/react-query'
import { PathType } from '@yaksok/api'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@yaksok/ui/tabs'
import { Suspense, useState } from 'react'
import LoungeMagazineSelect from '../lounge/lounge-magazine-select'

export type LoungeAndMagazineTabProps<T extends string> = {
  tab: T
  tabList: T[]
  url: PathType
  queryKey: 'magazine' | 'lounge'
}

const isMagazine = (queryKey: 'magazine' | 'lounge'): queryKey is 'magazine' =>
  queryKey === 'magazine'

export function LoungeAndMagazineTab<T extends string>({
  tab,
  tabList,
  url,
  queryKey,
}: LoungeAndMagazineTabProps<T>) {
  const queryClient = useQueryClient()
  const [category, setCategory] = useState<T>(tab)
  const [sort, setSort] = useState<string>('new')

  const changeCategory = (category: string) => {
    setCategory(category as T)
    queryClient.invalidateQueries({ queryKey: [queryKey, category, sort] })
  }

  return (
    <Tabs
      orientation="horizontal"
      value={category}
      onValueChange={changeCategory}
      className="bg-white px-5 py-4"
    >
      <TabsList className="sticky top-0 flex w-full justify-between gap-4 rounded-none bg-white pb-4">
        <div>
          {tabList.map(tab => (
            <TabsTrigger
              key={tab}
              value={tab}
              variant={'line'}
              className="ml-2"
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
  queryKey: 'magazine' | 'lounge'
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
  const params = {
    size: 10,
    category: category === 'All' ? undefined : category,
    // sort,
  }

  const result = useHttpInfiniteQuery([queryKey, category, sort], url, {
    params: params,
  })

  return (
    <div>
      {Array.from({ length: 100 }).map((_, index) => (
        <div key={index} className="h-10 w-full bg-gray-200">
          {index}
        </div>
      ))}
    </div>
  )
}

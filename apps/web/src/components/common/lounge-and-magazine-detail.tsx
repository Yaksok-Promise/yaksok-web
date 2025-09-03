import { useHttpQuery } from '@/hooks/tanstak/use-http-query'
import { PathType } from '@yaksok/api'
import { MagazineDetail } from '@yaksok/api/boardMagazineType'
import { useLoginStore } from '@yaksok/store'
import { getItem, LOCAL_STORAGE_KEY } from '@yaksok/utils'

export type LoungeAndMagazineDetailProps = {
  id: string
}

export default function LoungeAndMagazineDetail({
  id,
}: LoungeAndMagazineDetailProps) {
  const isMagazine = window.location.pathname.includes('magazine')
  const { accessToken } = useLoginStore()
  const href: PathType = isMagazine
    ? '/api/post/magazine/{postId}'
    : '/api/post/general-forum/{postId}'

  const result = useHttpQuery<undefined, MagazineDetail>(
    [isMagazine ? 'magazine' : 'general-forum', id],
    href,
    {
      headers: {
        Authorization: `Bearer ${window.ReactNativeWebView ? accessToken : getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)}`,
      },
      params: {
        postId: id,
      },
    }
  )

  console.log(result.data)

  return <div>{isMagazine ? 'Magazine' : 'GeneralForum'}</div>
}

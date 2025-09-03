import { useHttpQuery } from '@/hooks/tanstak/use-http-query'
import { useGetToken } from '@/hooks/use-get-token'
import { PathType } from '@yaksok/api'
import { MagazineDetail } from '@yaksok/api/boardMagazineType'

export type LoungeAndMagazineDetailProps = {
  id: string
}

export default function LoungeAndMagazineDetail({
  id,
}: LoungeAndMagazineDetailProps) {
  const isMagazine = window.location.pathname.includes('magazine')
  const token = useGetToken()

  const href: PathType = isMagazine
    ? '/api/post/magazine/{postId}'
    : '/api/post/general-forum/{postId}'

  const result = useHttpQuery<undefined, MagazineDetail>(
    [isMagazine ? 'magazine' : 'general-forum', id],
    href,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        postId: id,
      },
    }
  )

  console.log(result.data)

  return <div>{isMagazine ? 'Magazine' : 'GeneralForum'}</div>
}

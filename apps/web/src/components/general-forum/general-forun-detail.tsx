import { useHttpQuery } from '@/hooks/tanstak/use-http-query'
import { useGetToken } from '@/hooks/use-get-token'
import { MagazineDetail } from '@yaksok/api/boardMagazineType'

export type GeneralForumDetailProps = {
  id: string
}

export function GeneralForumDetail({ id }: GeneralForumDetailProps) {
  const token = useGetToken()
  const result = useHttpQuery<undefined, MagazineDetail>(
    ['general-forum', id],
    '/api/post/general-forum/{postId}',
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
  return <div>{id}</div>
}

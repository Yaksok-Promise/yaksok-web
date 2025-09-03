import { useHttpQuery } from '@/hooks/tanstak/use-http-query'
import { useGetToken } from '@/hooks/use-get-token'
import { MagazineDetail } from '@yaksok/api/boardMagazineType'

export type MagazineDetailProps = {
  id: string
}
export default function MagazineDetailShow({ id }: MagazineDetailProps) {
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

  console.log(result.data)

  return <div>MagazineDetail</div>
}

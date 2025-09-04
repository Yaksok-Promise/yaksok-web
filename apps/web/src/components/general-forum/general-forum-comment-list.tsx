import { useHttpQuery } from '@/hooks/tanstak/use-http-query'
import { useGetToken } from '@/hooks/use-get-token'
import { QUERY_KEY } from '@/utils/query-key'
import { CommentResponse } from '@yaksok/api/commentType'

export type GeneralForrumCommentListProps = {
  postId: string
}

export const GeneralForrumCommentList = ({
  postId,
}: GeneralForrumCommentListProps) => {
  const token = useGetToken()
  const result = useHttpQuery<undefined, CommentResponse>(
    [QUERY_KEY.COMMENT_LIST, postId],
    '/api/comment/list',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      query: {
        postId,
      },
    }
  )

  const { data } = result
  console.log('Comment List', data)

  return <div>GeneralForrumCommentList</div>
}

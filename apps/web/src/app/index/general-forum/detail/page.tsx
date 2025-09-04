import { GeneralForumButtonList } from '@/components/general-forum/general-forum-button-list'
import { GeneralForrumCommentList } from '@/components/general-forum/general-forum-comment-list'
import GeneralForumHeaderSelect from '@/components/general-forum/general-forum-header-select'
import { GeneralForumTitle } from '@/components/general-forum/general-forum-title'
import { useHttpQuery } from '@/hooks/tanstak/use-http-query'
import { useGetToken } from '@/hooks/use-get-token'
import { useUpdateToken } from '@/hooks/use-update-token'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { MagazineDetail } from '@yaksok/api/boardMagazineType'
import { Suspense } from 'react'

type CommunityDetailPageProps = {
  params: {
    id: string
  }
}

export default function GeneralForumDetailPage({
  params: { id },
}: CommunityDetailPageProps) {
  useUpdateToken()

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
  const { data } = result
  console.log(data)

  // props
  const titleProps = {
    title: data.title,
    tags: data.tags,
    author: data.author,
    date: data.createdAt,
  }

  const buttonListProps = {
    likes: data.likes,
    liked: data.liked,
    views: data.views,
    commentCount: data.commentCount,
    id: data.id,
  }

  return (
    <AppScreen
      appBar={{
        title: '자유게시판',
        textColor: '#ffffff',
        iconColor: '#ffffff',
        backgroundColor: '#000000',
        border: false,
        renderRight: () => <GeneralForumHeaderSelect isMine={data.mine} />,
      }}
    >
      <main className="flex min-h-full flex-col bg-bgColor px-4 pb-10">
        <GeneralForumTitle {...titleProps} />
        <div className="pt-5 pb-20">{data.body}</div>
        <GeneralForumButtonList {...buttonListProps} />
        <Suspense fallback={<div>Loading...</div>}>
          <GeneralForrumCommentList postId={id} />
        </Suspense>
      </main>
    </AppScreen>
  )
}

import AppLayout from '@/components/common/app-layout'
import { GeneralForumButtonList } from '@/components/general-forum/general-forum-button-list'
import { GeneralForumCommentList } from '@/components/general-forum/general-forum-comment-list'
import { GeneralForumHeaderDropDown } from '@/components/general-forum/general-forum-header-drop-down'
import { GeneralForumTitle } from '@/components/general-forum/general-forum-title'
import { useHttpQuery } from '@/hooks/tanstak/use-http-query'
import { useGetToken } from '@/hooks/use-get-token'
import { useUpdateToken } from '@/hooks/use-update-token'
import { QUERY_KEY } from '@/utils/query-key'
import { useFlow } from '@/utils/stackflow'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { MagazineDetail } from '@yaksok/api/boardMagazineType'
import { CommentResponse } from '@yaksok/api/commentType'
import { ChevronLeft } from '@yaksok/icons'
import { TiptapViewer } from '@yaksok/ui'
import { ModalRoot } from '@yaksok/ui/modal'
import { changeContent } from '@yaksok/ui/tiptap'
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
  const { pop } = useFlow()

  // general forum detail
  const token = useGetToken()
  const result = useHttpQuery<undefined, MagazineDetail>(
    [QUERY_KEY.GENERAL_FORUM, id],
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
  const { data: generalForumDetailData } = result

  // general forum comment list
  const commentListResult = useHttpQuery<undefined, CommentResponse>(
    [QUERY_KEY.COMMENT_LIST, id],
    '/api/comment/list',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      query: {
        postId: id,
      },
    },
    {}
  )

  const { data: commentListData } = commentListResult

  const countComment = (commentListData ?? []).reduce(
    (sum, c) => sum + 1 + (Array.isArray(c.replies) ? c.replies.length : 0),
    0
  )

  // props
  const titleProps = {
    title: generalForumDetailData.title,
    tags: generalForumDetailData.tags,
    author: generalForumDetailData.author,
    date: generalForumDetailData.createdAt,
  }

  const buttonListProps = {
    likes: generalForumDetailData.likes,
    liked: generalForumDetailData.liked,
    scrapCount: generalForumDetailData.scrapCount,
    scraped: generalForumDetailData.scrapped,
    commentCount: countComment,
    id: generalForumDetailData.id,
  }

  const content = changeContent(
    generalForumDetailData.body,
    generalForumDetailData.images
  )

  return (
    <AppLayout>
      <AppScreen
        appBar={{
          title: '자유게시판',
          textColor: '#ffffff',
          iconColor: '#ffffff',
          backgroundColor: '#000000',
          border: false,
          renderRight: () => (
            <GeneralForumHeaderDropDown
              isMine={generalForumDetailData.mine}
              data={generalForumDetailData}
            />
          ),
          backButton: {
            renderIcon: () => <ChevronLeft size={24} stroke="white" />,
            onClick: () => {
              pop()
            },
          },
        }}
      >
        <main className="relative flex min-h-full flex-col bg-bgColor">
          <div className="px-4">
            <GeneralForumTitle {...titleProps} />
            <div className="px-4 py-5">
              <TiptapViewer content={content} />
            </div>
            <GeneralForumButtonList {...buttonListProps} />
          </div>
          <div className="mb-40">
            <Suspense fallback={<div>Loading...</div>}>
              <GeneralForumCommentList
                data={commentListData}
                countComment={countComment}
                postId={id}
              />
            </Suspense>
          </div>
        </main>
      </AppScreen>
      <ModalRoot />
    </AppLayout>
  )
}

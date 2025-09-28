import { useCommentReplyMutation } from '@/hooks/tanstak/use-comment-mutation'
import { useCommentLikeOptimistic } from '@/hooks/tanstak/use-optimistic-post'
import { flattenAndMarkMostLiked } from '@/utils/change-comment-list-optimistic'
import { CommentResponse } from '@yaksok/api/commentType'
import {
  BlankHeart,
  CommunicationDot,
  MoreVertical,
  Pencil,
  Trash,
  TriangleWarning,
} from '@yaksok/icons'
import { useCommentEditorStore } from '@yaksok/store'
import { Comment, DropDown, NotComment } from '@yaksok/ui'
import { useModal } from '@yaksok/ui/modal'
import { RefObject, useMemo, useRef } from 'react'
import { DeleteModal } from '../common/modal/delete-modal'
import { GeneralForumTextField } from './general-forum-text-field'

export type GeneralForumCommentListProps = {
  data: CommentResponse
  countComment: number
  postId: string
}

export const GeneralForumCommentList = ({
  data,
  countComment,
  postId,
}: GeneralForumCommentListProps) => {
  // textField 관련 상태

  const { commentId, mode } = useCommentEditorStore()

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  // 댓글 리스트 관련 상태
  const items = useMemo(() => {
    const base = flattenAndMarkMostLiked(data)
    return base.map(it => ({
      ...it,
      isFocus: it.id === commentId,
      isEdit: it.id === commentId && mode === 'edit',
    }))
  }, [data, commentId, mode])

  if (countComment === 0)
    return (
      <>
        <NotComment />
        <GeneralForumTextField ref={textAreaRef} postId={postId} />
      </>
    )

  return (
    <>
      {items.map(item => (
        <Comment
          key={item.id}
          item={item}
          likeButton={
            <LikedButton
              liked={item.liked}
              likeCount={item.likeCount}
              commentId={item.id}
              postId={postId}
            />
          }
          sideButton={
            <CommentDropDown
              text={item.content}
              isMine={item.mine}
              commentId={item.id}
              postId={postId}
              textAreaRef={textAreaRef}
            />
          }
        />
      ))}
      <GeneralForumTextField ref={textAreaRef} postId={postId} />
    </>
  )
}

type LikedButtonProps = {
  liked: boolean
  likeCount: number
  commentId: string
  postId: string
}
const LikedButton = ({
  liked,
  likeCount,
  commentId,
  postId,
}: LikedButtonProps) => {
  const { handleOptimisticPost: handleLike } = useCommentLikeOptimistic(
    postId,
    commentId
  )
  return (
    <button className="flex items-center gap-1" onClick={handleLike}>
      <BlankHeart
        size={20}
        stroke="#636366"
        fill={liked ? '#636366' : 'none'}
      />
      {likeCount}
    </button>
  )
}

type CommentDropDownProps = {
  isMine: boolean
  commentId: string
  postId: string
  textAreaRef: RefObject<HTMLTextAreaElement | null>
  text: string
}

const CommentDropDown = ({
  commentId,
  isMine,
  postId,
  textAreaRef,
  text,
}: CommentDropDownProps) => {
  const { focusEdit, focusReply, clear } = useCommentEditorStore()

  // 댓글, 답글 삭제 로직
  const commentDeleteMutation = useCommentReplyMutation({
    commentId: commentId,
    postId,
    mode: 'comment',
    method: 'delete',
  })

  const { openModal, closeModal, opened } = useModal()

  const dropdownMenuList = isMine
    ? [
        {
          label: '수정',
          value: 'edit',
          render: <Pencil size={16} stroke="#018381" />,
          onClick: () => {
            focusEdit(commentId, textAreaRef, text)
          },
        },
        {
          label: '삭제',
          value: 'delete',
          render: <Trash size={16} stroke="#018381" />,
          onClick: async () => {
            openModal()
          },
        },
        {
          label: '답글',
          value: 'reply',
          render: <CommunicationDot size={16} stroke="#018381" />,
          onClick: () => {
            focusReply(commentId, textAreaRef)
          },
        },
      ]
    : [
        {
          label: '답글',
          value: 'reply',
          render: <CommunicationDot size={16} stroke="#018381" />,
          onClick: () => {
            focusReply(commentId, textAreaRef)
          },
        },
        {
          label: '신고',
          value: 'report',
          render: <TriangleWarning size={16} stroke="#018381" />,
          onClick: () => console.log('신고'),
        },
      ]

  return (
    <>
      <DropDown
        data={dropdownMenuList}
        trigger={<MoreVertical size={16} stroke="#959598" />}
      />

      <DeleteModal
        opened={opened}
        closeModal={closeModal}
        handleDelete={() => {
          commentDeleteMutation.mutateAsync(undefined)
          clear(textAreaRef)
        }}
      >
        <span>잠깐, 해당 댓글을 정말 삭제하시겠습니까?</span>
      </DeleteModal>
    </>
  )
}

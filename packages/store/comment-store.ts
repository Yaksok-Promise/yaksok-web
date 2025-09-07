import { RefObject } from 'react'
import { useStore } from 'zustand'
import { createStore } from 'zustand/vanilla'

export type EditorMode = 'comment' | 'reply' | 'edit'

export interface CommentEditorState {
  commentId: string | null
  mode: EditorMode
  text: string

  focusReply: (
    commentId: string,
    ref: RefObject<HTMLTextAreaElement | null>
  ) => void
  focusEdit: (
    commentId: string,
    ref: RefObject<HTMLTextAreaElement | null>,
    seed: string
  ) => void
  // focusDelete: (commentId: string) => void
  setText: (v: string) => void
  clear: (ref: RefObject<HTMLTextAreaElement | null>) => void
}

export const commentEditorStore = createStore<CommentEditorState>(set => ({
  commentId: null,
  mode: 'comment',
  text: '',

  // focusDelete: commentId => set({ mode: 'comment', commentId: commentId }),
  focusReply: (
    commentId,
    ref: RefObject<HTMLTextAreaElement | null>,
    seed = ''
  ) => {
    set({ mode: 'reply', commentId, text: seed })
    requestAnimationFrame(() => ref?.current?.focus())
  },
  focusEdit: (commentId, ref: RefObject<HTMLTextAreaElement | null>, seed) => {
    set({ mode: 'edit', commentId, text: seed })
    requestAnimationFrame(() => ref?.current?.focus())
  },
  setText: v => set({ text: v }),
  clear: (ref: RefObject<HTMLTextAreaElement | null>) => {
    set({ mode: 'comment', commentId: null, text: '' })
    ref?.current?.blur()
  },
}))

export const useCommentEditorStore = () => useStore(commentEditorStore)

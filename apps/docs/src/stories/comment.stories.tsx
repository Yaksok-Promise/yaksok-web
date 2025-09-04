// stories/comment.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Comment, NotComment } from '@yaksok/ui'
import type { CommentProps, FlatItem } from '@yaksok/ui'
import type { TypeWithDeepControls } from 'storybook-addon-deep-controls'

const baseItem: FlatItem = {
  mode: 'comment',
  createdAt: '2021-01-01T00:00:00Z',
  id: '1',
  author: '활명수',
  authorProfileImageUrl: 'https://via.placeholder.com/150',
  content: '활명수',
  likeCount: 0,
  liked: false,
  mine: false,
  isMostLiked: false,
}

const meta: TypeWithDeepControls<Meta<CommentProps>> = {
  title: 'stories/comment',
  component: Comment,
  tags: ['autodocs'],
  parameters: {
    deepControls: { enabled: true },
  },
  argTypes: {
    'item.mode': {
      control: { type: 'radio' },
      options: ['comment', 'reply'],
      description: '`FlatItem.mode`',
    },
    'item.isMostLiked': {
      control: { type: 'boolean' },
      description: '`FlatItem.isMostLiked`',
    },
    backgroundOverride: {
      control: { type: 'select' },
      options: [undefined, 'comment', 'reply'],
      description: 'Force background override',
    },
    sideButton: { control: false },
    likeButton: { control: false },
  },
  args: {
    item: { ...baseItem, mode: 'comment', isMostLiked: false },
  },
}
export default meta

type Story = StoryObj<CommentProps>

// Common sample buttons (optional)
const SampleSideButton = <button style={{ fontSize: 12 }}>⋯</button>
const SampleLikeButton = (
  <button style={{ fontSize: 12 }}>Like (optimistic)</button>
)

export const NormalComment: Story = {
  args: {
    item: { ...baseItem, mode: 'comment', isMostLiked: false },
    backgroundOverride: 'comment',
    sideButton: SampleSideButton,
    likeButton: SampleLikeButton,
  },
}

export const ReplyComment: Story = {
  args: {
    item: {
      ...baseItem,
      mode: 'reply',
      parentId: 'parent-1',
      isMostLiked: false,
    },
    backgroundOverride: 'reply',
    sideButton: SampleSideButton,
    likeButton: SampleLikeButton,
  },
}

export const MostLikedComment: Story = {
  args: {
    item: { ...baseItem, mode: 'comment', isMostLiked: true },
    backgroundOverride: undefined,
    sideButton: SampleSideButton,
    likeButton: SampleLikeButton,
  },
}

export const MostLikedReply: Story = {
  args: {
    item: {
      ...baseItem,
      mode: 'reply',
      parentId: 'parent-1',
      isMostLiked: true,
    },
    backgroundOverride: undefined,
    sideButton: SampleSideButton,
    likeButton: SampleLikeButton,
  },
}

export const NotCommentContainer: StoryObj = {
  render: () => <NotComment />,
}

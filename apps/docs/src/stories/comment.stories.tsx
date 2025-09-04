import type { Meta, StoryObj } from '@storybook/react'
import { Comment, CommentProps, NotComment } from '@yaksok/ui'

const meta: Meta<CommentProps> = {
  component: Comment,
  title: 'stories/comment',
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: {
        type: 'select',
      },
      options: ['reply', 'comment'],
    },
    background: {
      control: {
        type: 'select',
      },
      options: ['comment', 'reply'],
    },
    isMostLiked: {
      control: {
        type: 'boolean',
      },
    },
  },
}

export default meta

type Story = StoryObj<CommentProps>

export const NormalComment: Story = {
  render: props => <Comment {...props} />,
  args: {
    mode: 'comment',
    background: 'comment',
    isMostLiked: false,
    commentData: {
      id: '1',
      author: '활명수',
      authorProfileImageUrl: 'https://via.placeholder.com/150',
      content: '활명수',
      createdAt: '2021-01-01',
      liked: false,
      mine: false,
      likeCount: 0,
    },
  },
}

export const ReplyComment: Story = {
  render: props => <Comment {...props} />,
  args: {
    mode: 'reply',
    background: 'reply',
    commentData: {
      id: '1',
      author: '활명수',
      authorProfileImageUrl: 'https://via.placeholder.com/150',
      content: '활명수',
      createdAt: '2021-01-01',
      liked: false,
      mine: false,
      likeCount: 0,
    },
  },
}

export const MostLikedComment: Story = {
  render: props => <Comment {...props} />,
  args: {
    mode: 'comment',
    background: 'comment',
    isMostLiked: true,
    commentData: {
      id: '1',
      author: '활명수',
      authorProfileImageUrl: 'https://via.placeholder.com/150',
      content: '활명수',
      createdAt: '2021-01-01',
      liked: false,
      mine: false,
      likeCount: 0,
    },
  },
}

export const MostLikedReply: Story = {
  render: props => <Comment {...props} />,
  args: {
    mode: 'reply',
    background: 'reply',
    isMostLiked: true,
    commentData: {
      id: '1',
      author: '활명수',
      authorProfileImageUrl: 'https://via.placeholder.com/150',
      content: '활명수',
      createdAt: '2021-01-01',
      liked: false,
      mine: false,
      likeCount: 0,
    },
  },
}

export const NotCommentContainer: Story = {
  render: () => <NotComment />,
}

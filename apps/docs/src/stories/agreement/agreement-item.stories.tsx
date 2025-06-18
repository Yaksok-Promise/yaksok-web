import type { Meta, StoryObj } from '@storybook/react'
import { AgreementItem, AgreementItemProps } from '@yaksok/ui/agreement'
import { useEffect, useState } from 'react'

const meta = {
  title: 'stories/agreement/agreement-item',
  component: AgreementItem,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div className="flex w-[500px] justify-center">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: {
        type: 'text',
      },
    },
    isRequired: {
      control: {
        type: 'boolean',
      },
    },
    showDetailButton: {
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    id: 'personal-info-agreement',
    content: '개인정보 수집 및 이용약관',
    isRequired: false,
    showDetailButton: true,
    checked: false,
  },
} satisfies Meta<typeof AgreementItem>
export default meta

type Story = StoryObj<typeof AgreementItem>

export const Primary: Story = {
  render: (props: AgreementItemProps<string>) => {
    const [checked, setChecked] = useState({
      [props.id]: props.checked,
    })
    useEffect(() => {
      setChecked({
        [props.id]: props.checked,
      })
    }, [props.checked, props.id])

    return (
      <AgreementItem
        {...props}
        checked={checked[props.id]}
        setChecked={id => {
          setChecked({
            ...checked,
            [id]: !checked[id],
          })
        }}
      />
    )
  },
  name: 'AgreementItem',
}

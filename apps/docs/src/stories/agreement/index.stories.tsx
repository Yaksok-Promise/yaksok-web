import type { Meta, StoryObj } from '@storybook/react'
import {
  Agreement,
  AgreementItemContent,
  useAgreement,
} from '@yaksok/ui/agreement'

const meta = {
  title: 'stories/agreement/index',
  component: Agreement,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '콘솔에서 약관동의 상태를 확인할 수 있습니다.',
      },
    },
  },
  decorators: [
    Story => (
      <div className="flex w-[500px] justify-center bg-white p-5">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Agreement>
export default meta

type Story = StoryObj<typeof Agreement>

export const Primary: Story = {
  render: () => {
    type AgreementItemId =
      | 'age'
      | 'personal-info-agreement'
      | 'marketing-agreement'

    const itemList: AgreementItemContent<AgreementItemId>[] = [
      { id: 'age', content: '만 14세 이상', isRequired: true },
      {
        id: 'personal-info-agreement',
        content: '개인정보 수집 및 이용약관',
        showDetailButton: true,
        isRequired: true,
      },
      {
        id: 'marketing-agreement',
        content: ' 마케팅 및 이벤트 활용 동의',
        showDetailButton: true,
      },
    ]

    const agreementHook = useAgreement(itemList)
    const { itemsChecked } = agreementHook

    console.log(itemsChecked)

    return <Agreement itemList={itemList} agreementHook={agreementHook} />
  },
  name: 'Agreement',
}

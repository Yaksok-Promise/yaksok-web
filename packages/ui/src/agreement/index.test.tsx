import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { Agreement, AgreementItemContent } from './index'
import { useAgreement } from './use-agreement'

type AgreementItemId = 'age' | 'personal-info-agreement' | 'marketing-agreement'

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
    content: '마케팅 및 이벤트 활용 동의',
    showDetailButton: true,
  },
]

// 테스트용 래퍼 컴포넌트 생성
function TestAgreementWrapper() {
  const agreementHook = useAgreement(itemList)
  return <Agreement itemList={itemList} agreementHook={agreementHook} />
}

afterEach(() => {
  cleanup()
})

describe('Agreement', () => {
  it('전체 동의 버튼이 렌더링된다', () => {
    render(<TestAgreementWrapper />)
    expect(screen.getByText('전체 동의')).toBeInTheDocument()
  })

  it('각 약관 항목이 필수 여부와 함께 올바르게 렌더링된다', () => {
    render(<TestAgreementWrapper />)
    itemList.forEach(item => {
      expect(
        screen.getByText(
          content =>
            content.replace(/\s/g, '') ===
            `${item.isRequired ? '(필수)' : '(선택)'}${item.content}`.replace(
              /\s/g,
              ''
            )
        )
      ).toBeInTheDocument()
    })
  })

  it('각 항목 클릭 시 체크박스가 토글된다', () => {
    render(<TestAgreementWrapper />)
    const ageCheckbox = screen
      .getByText('(필수) 만 14세 이상')
      .closest('button')
      ?.querySelector("input[type='checkbox']")
    expect(ageCheckbox).not.toBeChecked()
    fireEvent.click(screen.getByText('(필수) 만 14세 이상').closest('button')!)
    expect(ageCheckbox).toBeChecked()
    fireEvent.click(screen.getByText('(필수) 만 14세 이상').closest('button')!)
    expect(ageCheckbox).not.toBeChecked()
  })

  it('전체 동의 버튼 클릭 시 모든 항목이 체크된다', () => {
    render(<TestAgreementWrapper />)
    const checkAllButton = screen.getByText('전체 동의').closest('button')!
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkAllButton)
    checkboxes.forEach(cb => expect(cb).toBeChecked())
  })

  it('전체 동의 버튼 클릭 후 다시 클릭하면 모든 항목이 해제된다', () => {
    render(<TestAgreementWrapper />)
    const checkAllButton = screen.getByText('전체 동의').closest('button')!
    const checkboxes = screen.getAllByRole('checkbox')
    // 전체 동의 클릭(체크) -> 모든 항목들 체크
    fireEvent.click(checkAllButton)
    checkboxes.forEach(cb => expect(cb).toBeChecked())
    // 전체 동의 다시 클릭(해제) -> 모든 항목 해제
    fireEvent.click(checkAllButton)
    checkboxes.forEach(cb => expect(cb).not.toBeChecked())
  })

  it('하나의 항목이 체크된 상태에서 전체 동의 버튼을 누르면 모든 항목이 체크된다', () => {
    render(<TestAgreementWrapper />)
    const checkAllButton = screen.getByText('전체 동의').closest('button')!
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[1])
    expect(checkboxes[1]).toBeChecked()
    fireEvent.click(checkAllButton)
    checkboxes.forEach(cb => expect(cb).toBeChecked())
  })

  it('"보기" 버튼이 필요한 항목에만 렌더링된다', () => {
    render(<TestAgreementWrapper />)
    const detailButtons = screen.getAllByText('보기')
    expect(detailButtons.length).toBe(2)
  })
})

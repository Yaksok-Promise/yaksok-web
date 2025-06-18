import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { Agreement, AgreementItemContent } from './index'

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

afterEach(() => {
  cleanup()
})

describe('Agreement', () => {
  it('전체 동의 버튼이 렌더링된다', () => {
    render(<Agreement itemList={itemList} />)
    expect(screen.getByText('전체 동의')).toBeInTheDocument()
  })

  it('각 약관 항목이 필수 여부와 함께 올바르게 렌더링된다', () => {
    render(<Agreement itemList={itemList} />)
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
    render(<Agreement itemList={itemList} />)
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

  it('전체 동의 버튼 클릭 시 기존 선택 항목 상태를 유지하면서 필수 항목들이 체크된다', () => {
    render(<Agreement itemList={itemList} />)
    const checkAllButton = screen.getByText('전체 동의').closest('button')!
    const checkboxes = screen.getAllByRole('checkbox')

    // 마케팅 동의(선택 항목)를 먼저 체크
    fireEvent.click(
      screen.getByText('(선택) 마케팅 및 이벤트 활용 동의').closest('button')!
    )
    expect(checkboxes[3]).toBeChecked() // 마케팅 동의 체크 확인

    // 전체 동의 버튼 클릭
    fireEvent.click(checkAllButton)

    // 전체 동의 버튼과 필수 항목들이 체크되었는지 확인
    expect(checkboxes[0]).toBeChecked() // 전체 동의 버튼
    expect(checkboxes[1]).toBeChecked() // 만 14세 이상
    expect(checkboxes[2]).toBeChecked() // 개인정보 수집 및 이용약관

    // 선택 항목(마케팅)은 기존 상태 유지
    expect(checkboxes[3]).toBeChecked() // 마케팅 동의는 여전히 체크 상태
  })

  it('전체 동의 버튼 클릭 후 다시 클릭하면 모든 항목이 해제된다', () => {
    render(<Agreement itemList={itemList} />)
    const checkAllButton = screen.getByText('전체 동의').closest('button')!
    const checkboxes = screen.getAllByRole('checkbox')
    // 전체 동의 클릭(체크) -> 필수 항목들만 체크
    fireEvent.click(checkAllButton)
    expect(checkboxes[0]).toBeChecked() // 전체 동의 버튼
    expect(checkboxes[1]).toBeChecked() // 만 14세 이상
    expect(checkboxes[2]).toBeChecked() // 개인정보 수집 및 이용약관
    expect(checkboxes[3]).not.toBeChecked() // 마케팅 및 이벤트 활용 동의
    // 전체 동의 다시 클릭(해제) -> 모든 항목 해제
    fireEvent.click(checkAllButton)
    checkboxes.forEach(cb => expect(cb).not.toBeChecked())
  })

  it('"보기" 버튼이 필요한 항목에만 렌더링된다', () => {
    render(<Agreement itemList={itemList} />)
    const detailButtons = screen.getAllByText('보기')
    expect(detailButtons.length).toBe(2)
  })
})

import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { Button } from './button'

beforeAll(() => {
  window.alert = vi.fn()
})

describe('<Button />', () => {
  afterEach(() => {
    cleanup()
  })

  it('className이 버튼에 정상적으로 적용된다.', () => {
    render(<Button className="text-caption1">button</Button>)
    const button = screen.getByRole('button', { name: /button/i })
    expect(button).toHaveClass('text-caption1')
  })

  it('children으로 전달된 텍스트가 버튼에 렌더링된다.', () => {
    render(<Button>테스트</Button>)
    expect(screen.getByRole('button', { name: '테스트' })).toBeInTheDocument()
  })

  it('disabled 속성이 true일 때 클릭 이벤트가 발생하지 않는다.', async () => {
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        비활성
      </Button>
    )
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it("onClick에서 alert('clicked')를 호출하면 alert가 정상적으로 호출된다.", async () => {
    const onClick = vi.fn(() => alert('clicked'))
    render(<Button onClick={onClick}>Click me</Button>)
    await userEvent.click(screen.getByRole('button', { name: /click me/i }))
    expect(onClick).toHaveBeenCalled()
    expect(window.alert).toHaveBeenCalledWith('clicked')
  })
})

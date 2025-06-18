import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Checkbox } from './checkbox'

describe('<Checkbox />', () => {
  afterEach(() => {
    cleanup()
  })
  it('체크박스가 정상적으로 렌더링된다', () => {
    render(<Checkbox />)
    const input = screen.getByRole('checkbox')
    expect(input).toBeInTheDocument()
  })

  it('체크박스를 클릭하면 checked 상태가 변경된다', () => {
    const Wrapper = () => {
      const [checked, setChecked] = React.useState(false)
      return <Checkbox checked={checked} setChecked={setChecked} />
    }
    render(<Wrapper />)
    const input = screen.getByRole('checkbox')
    expect(input).not.toBeChecked()
    fireEvent.click(input)
    expect(input).toBeChecked()
  })

  it('theme prop에 따라 cva에 해당하는 theme의 클래스가 적용된다', () => {
    const { container } = render(<Checkbox theme="rounded" />)
    const label = container.querySelector('label')
    expect(label).toHaveClass(
      'rounded-full bg-subGray01 has-checked:bg-black01'
    )
  })
})

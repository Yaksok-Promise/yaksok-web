import { cleanup, render, screen } from '@testing-library/react'
import { If, IfProps } from './if-component'

describe('If', () => {
  afterEach(() => {
    cleanup()
  })

  it('condition이 참일 경우 children을 렌더링한다', () => {
    render(
      <If condition={true}>
        <div>테스트</div>
      </If>
    )
    expect(screen.getByText('테스트')).toBeInTheDocument()
  })

  it('condition이 false일 경우 children을 렌더링하지 않는다', () => {
    render(
      <If condition={false}>
        <div>테스트</div>
      </If>
    )
    expect(screen.queryByText('테스트')).not.toBeInTheDocument()
  })
})

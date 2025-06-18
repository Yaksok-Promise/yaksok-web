import { cleanup, render, screen } from '@testing-library/react'
import { Header, HeaderProps } from './header'

const TestHeader = (props: HeaderProps) => {
  return (
    <Header.Container {...props}>
      <Header.Left>왼쪽</Header.Left>
      <Header.Title>제목</Header.Title>
      <Header.Right>오른쪽</Header.Right>
    </Header.Container>
  )
}

describe('header', () => {
  afterEach(() => {
    cleanup()
  })

  it('header가 정상적으로 rendering 된다', () => {
    render(<TestHeader />)
    expect(screen.getByText('왼쪽')).toBeInTheDocument()
    expect(screen.getByText('제목')).toBeInTheDocument()
    expect(screen.getByText('오른쪽')).toBeInTheDocument()
  })

  it('theme이 black일 경우 background color는 black01, text color는 white이다', () => {
    const { container } = render(<TestHeader theme="black" />)
    const rootDiv = container.firstChild as HTMLElement
    expect(rootDiv.className).toContain('bg-black01')
    expect(rootDiv.className).toContain('text-white')

    // title 내에도 적용되어야 함
    const title = screen.getByText('제목')
    expect(title.className).toContain('text-white')
  })

  it('theme이 white일 경우 background color는 white, text color는 black01이다', () => {
    const { container } = render(<TestHeader theme="white" />)
    const rootDiv = container.firstChild as HTMLElement
    expect(rootDiv.className).toContain('bg-white')
    expect(rootDiv.className).toContain('text-black01')

    const title = screen.getByText('제목')
    expect(title.className).toContain('text-black')
  })

  it('theme이 white이면서 blur일 경우 blur와 반투명 background가 적용된다', () => {
    const { container } = render(<TestHeader theme="white" blur={true} />)
    const rootDiv = container.firstChild as HTMLElement
    expect(rootDiv.className).toContain('bg-white/30')
    expect(rootDiv.className).toContain('backdrop-blur-[50px]')
    expect(rootDiv.className).toContain('text-black01')
  })

  it('theme이 black이면서 blur일 경우에도 동일하게 적용된다', () => {
    const { container } = render(<TestHeader theme="black" blur={true} />)
    const rootDiv = container.firstChild as HTMLElement
    expect(rootDiv.className).toContain('bg-black01')
    expect(rootDiv.className).toContain('backdrop-blur-[50px]')
    expect(rootDiv.className).toContain('text-white')
  })
})

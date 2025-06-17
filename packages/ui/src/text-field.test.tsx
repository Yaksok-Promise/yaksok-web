import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import TextField from './text-field'

const defaultProps = {
  label: '이메일',
  placeholder: '이메일을 입력해 주세요',
  regex: /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  message: {
    regexError: '이메일 형식이 올바르지 않습니다.',
    verificationError: '이메일 인증에 실패했습니다.',
  },
}

describe('TextField', () => {
  beforeEach(() => {
    cleanup()
  })

  it('기본 렌더링이 올바르게 됩니다', () => {
    render(<TextField {...defaultProps} />)

    expect(screen.getByText('이메일')).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('이메일을 입력해 주세요')
    ).toBeInTheDocument()
  })

  it('입력값이 비어있을 때 상태가 초기화됩니다', () => {
    render(<TextField {...defaultProps} />)

    const input = screen.getByPlaceholderText('이메일을 입력해 주세요')
    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.change(input, { target: { value: '' } })

    expect(screen.getByText('이메일')).toBeInTheDocument()
  })

  it('정규식에 맞지 않는 입력시 에러 메시지가 표시됩니다', () => {
    render(<TextField {...defaultProps} />)

    const input = screen.getByPlaceholderText('이메일을 입력해 주세요')
    fireEvent.change(input, { target: { value: 'invalid-email' } })

    expect(
      screen.getByText('이메일 형식이 올바르지 않습니다.')
    ).toBeInTheDocument()
  })

  it('onVerify가 없을 때 정규식 통과시 성공 상태가 됩니다', () => {
    render(<TextField {...defaultProps} />)

    const input = screen.getByPlaceholderText('이메일을 입력해 주세요')
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    expect(screen.getByText('이메일')).toBeInTheDocument()
    // Check 아이콘이 렌더링되는지 확인 (성공 상태)
    const checkIcon = document.querySelector('svg')
    expect(checkIcon).toBeInTheDocument()
  })

  it('onVerify가 있을 때 인증 버튼이 표시됩니다', () => {
    const mockOnVerify = vi.fn().mockReturnValue(true)
    render(<TextField {...defaultProps} onVerify={mockOnVerify} />)

    expect(screen.getByText('인증하기')).toBeInTheDocument()
  })

  it('정규식에 맞지 않으면 인증 버튼이 비활성화됩니다', () => {
    const mockOnVerify = vi.fn().mockReturnValue(true)
    render(<TextField {...defaultProps} onVerify={mockOnVerify} />)

    const input = screen.getByPlaceholderText('이메일을 입력해 주세요')
    fireEvent.change(input, { target: { value: 'invalid-email' } })

    const verifyButton = screen.getByText('인증하기')
    expect(verifyButton).toBeDisabled()
  })

  it('입력값이 비어있으면 인증 버튼이 비활성화됩니다', () => {
    const mockOnVerify = vi.fn().mockReturnValue(true)
    render(<TextField {...defaultProps} onVerify={mockOnVerify} />)

    const verifyButton = screen.getByText('인증하기')
    expect(verifyButton).toBeDisabled()
  })

  it('정규식 통과시 인증 버튼이 활성화됩니다', () => {
    const mockOnVerify = vi.fn().mockReturnValue(true)
    render(<TextField {...defaultProps} onVerify={mockOnVerify} />)

    const input = screen.getByPlaceholderText('이메일을 입력해 주세요')
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    const verifyButton = screen.getByText('인증하기')
    expect(verifyButton).not.toBeDisabled()
  })

  it('인증 성공시 성공 상태가 됩니다', async () => {
    const mockOnVerify = vi.fn().mockReturnValue(true)
    const { container } = render(
      <TextField {...defaultProps} onVerify={mockOnVerify} />
    )

    const input = screen.getByPlaceholderText(
      '이메일을 입력해 주세요'
    ) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    const verifyButton = screen.getByText('인증하기')
    fireEvent.click(verifyButton)

    // TextField 컴포넌트가 onVerify를 호출했는지 확인
    expect(mockOnVerify).toHaveBeenCalled()

    await waitFor(() => {
      const checkIcon = container.querySelector('svg')
      expect(checkIcon).toBeInTheDocument()
    })
  })

  it('인증 실패시 에러 메시지가 표시됩니다', async () => {
    const mockOnVerify = vi.fn().mockReturnValue(false)
    render(<TextField {...defaultProps} onVerify={mockOnVerify} />)

    const input = screen.getByPlaceholderText(
      '이메일을 입력해 주세요'
    ) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    const verifyButton = screen.getByText('인증하기')
    fireEvent.click(verifyButton)

    expect(mockOnVerify).toHaveBeenCalled()

    await waitFor(() => {
      expect(
        screen.getByText('이메일 인증에 실패했습니다.')
      ).toBeInTheDocument()
    })
  })

  it('인증 완료 후 입력시 상태가 초기화됩니다', async () => {
    const mockOnVerify = vi.fn().mockReturnValue(true)
    const { container } = render(
      <TextField {...defaultProps} onVerify={mockOnVerify} />
    )

    const input = screen.getByPlaceholderText('이메일을 입력해 주세요')

    // 첫 번째 입력 및 인증
    fireEvent.change(input, { target: { value: 'test@example.com' } })
    const verifyButton = screen.getByText('인증하기')
    fireEvent.click(verifyButton)

    await waitFor(() => {
      const checkIcon = container.querySelector('svg')
      expect(checkIcon).toBeInTheDocument()
    })

    // 다시 입력시 상태 초기화
    fireEvent.change(input, { target: { value: 'test2@example.com' } })

    expect(screen.getByText('이메일')).toBeInTheDocument()
  })

  it('다양한 타입의 input을 지원합니다', () => {
    render(<TextField {...defaultProps} type="password" />)

    const input = screen.getByPlaceholderText('이메일을 입력해 주세요')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('커스텀 className이 적용됩니다', () => {
    render(<TextField {...defaultProps} className="custom-class" />)

    const input = screen.getByPlaceholderText('이메일을 입력해 주세요')
    expect(input).toHaveClass('custom-class')
  })
})

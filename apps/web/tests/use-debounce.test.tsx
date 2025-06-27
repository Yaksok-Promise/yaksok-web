import { renderHook, act } from '@testing-library/react'
import { vi } from 'vitest'
import { useDebounce } from '../src/hooks/use-debounce'

describe('useDebounce 훅', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('콜백이 디바운스되어 일정 시간 후 한 번만 실행되어야 한다', () => {
    const { result } = renderHook(() => useDebounce())
    const mockCallback = vi.fn()

    const debounced = result.current(mockCallback, 500)

    act(() => {
      debounced()
      debounced()
      debounced()
    })

    // 아직 콜백이 호출되면 안 됨
    expect(mockCallback).not.toHaveBeenCalled()

    // 시간이 지난 후 콜백이 한 번만 호출되어야 함
    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(mockCallback).toHaveBeenCalledTimes(1)
  })

  it('새로운 디바운스 함수가 생성되면 이전 콜백은 취소되어야 한다', () => {
    const { result } = renderHook(() => useDebounce())
    const mockCallback1 = vi.fn()
    const mockCallback2 = vi.fn()

    act(() => {
      const firstDebounced = result.current(mockCallback1, 300)
      firstDebounced()
    })

    act(() => {
      // 새로운 디바운스 생성 → 이전 것은 cancel 처리되어야 함
      const secondDebounced = result.current(mockCallback2, 300)
      secondDebounced()
    })

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(mockCallback1).not.toHaveBeenCalled()
    expect(mockCallback2).toHaveBeenCalledTimes(1)
  })

  it('콜백에 전달한 인자가 정상적으로 전달되어야 한다', () => {
    const { result } = renderHook(() => useDebounce())
    // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
    // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    const mockCallback = vi.fn((msg: string) => {})

    const debounced = result.current(mockCallback, 300)

    act(() => {
      debounced('hello')
    })

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(mockCallback).toHaveBeenCalledWith('hello')
  })
})

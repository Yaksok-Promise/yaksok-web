import { act, renderHook, waitFor } from '@testing-library/react'
import { useAutoplayProgress } from './use-auto-play-progress'

describe('useAutoplayProgress', () => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  let emblaApiMock: any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  let autoplayPluginMock: any
  let progressNodeMock: HTMLDivElement
  let addEventListenerMap: Record<string, Function>

  beforeEach(() => {
    addEventListenerMap = {}

    autoplayPluginMock = {
      timeUntilNext: vi.fn(() => 3000),
    }

    emblaApiMock = {
      plugins: vi.fn(() => ({ autoplay: autoplayPluginMock })),
      on: vi.fn((event: string, callback: Function) => {
        addEventListenerMap[event] = callback
        return emblaApiMock
      }),
    }

    progressNodeMock = document.createElement('div')
    Object.defineProperty(progressNodeMock, 'style', {
      value: {
        animationName: '',
        transform: '',
        setProperty: vi.fn(),
      },
      writable: true,
    })

    vi.stubGlobal('getComputedStyle', () => ({
      animationName: 'test-animation',
    }))

    const originalSetTimeout = globalThis.setTimeout

    vi.spyOn(globalThis, 'setTimeout').mockImplementation(cb => {
      return originalSetTimeout(cb, 0)
    })

    // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
    vi.spyOn(globalThis, 'cancelAnimationFrame').mockImplementation(() => {})
    // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
    vi.spyOn(globalThis, 'clearTimeout').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('autoplay:timerstopped 이벤트 발생 시 progress가 중지돼야 한다', async () => {
    const { result } = renderHook(() =>
      useAutoplayProgress(emblaApiMock, { current: progressNodeMock })
    )

    act(() => {
      addEventListenerMap['autoplay:timerset']?.()
    })

    await waitFor(() => {
      expect(result.current.showAutoplayProgress).toBe(true)
    })

    act(() => {
      addEventListenerMap['autoplay:timerstopped']?.()
    })

    await waitFor(() => {
      expect(result.current.showAutoplayProgress).toBe(false)
    })
  })

  it('정리(cleanup) 시 타이머와 RAF가 해제돼야 한다', () => {
    const cancelAnimationFrameSpy = vi.spyOn(globalThis, 'cancelAnimationFrame')
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout')

    const { unmount } = renderHook(() =>
      useAutoplayProgress(emblaApiMock, { current: progressNodeMock })
    )

    unmount()

    expect(cancelAnimationFrameSpy).toHaveBeenCalled()
    expect(clearTimeoutSpy).toHaveBeenCalled()
  })

  it('progressNode가 없으면 아무 작업도 하지 않아야 한다', () => {
    const { result } = renderHook(() =>
      useAutoplayProgress(emblaApiMock, { current: null })
    )

    act(() => {
      addEventListenerMap['autoplay:timerset']?.()
    })

    expect(result.current.showAutoplayProgress).toBe(false)
  })
})

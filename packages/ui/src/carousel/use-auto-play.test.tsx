import { act, render, waitFor } from '@testing-library/react'
import type { EmblaCarouselType } from 'embla-carousel'
import type { AutoplayType } from 'embla-carousel-autoplay'
import { useEffect } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAutoplay } from './use-auto-play'

type MockEmblaApi = {
  plugins: () => { autoplay: AutoplayType }
  on: (evt: string, cb: () => void) => MockEmblaApi
  emit: (evt: string) => void
}

function createMockEmblaApi(): MockEmblaApi {
  const listeners: Record<string, (() => void)[]> = {}

  return {
    plugins: vi.fn(),
    on: function (evt, cb) {
      listeners[evt] = listeners[evt] || []
      listeners[evt].push(cb)
      return this
    },
    emit: function (evt) {
      listeners[evt]?.forEach(cb => cb())
    },
  }
}

describe('useAutoplay 훅 테스트', () => {
  let mockEmblaApi: MockEmblaApi
  let autoplayMock: AutoplayType

  beforeEach(() => {
    mockEmblaApi = createMockEmblaApi()

    let isPlaying = true
    autoplayMock = {
      stop: vi.fn(() => {
        isPlaying = false
      }),
      play: vi.fn(() => {
        isPlaying = true
      }),
      reset: vi.fn(),
      isPlaying: () => isPlaying,
      options: { stopOnInteraction: true },
    } as unknown as AutoplayType

    mockEmblaApi.plugins = vi.fn(() => ({ autoplay: autoplayMock }))
  })

  it('초기 상태에서 autoplayIsPlaying이 true여야 한다', async () => {
    let autoplayIsPlaying = false

    const HookWrapper = () => {
      const { autoplayIsPlaying: isPlaying } = useAutoplay(
        mockEmblaApi as unknown as EmblaCarouselType
      )
      useEffect(() => {
        autoplayIsPlaying = isPlaying
      }, [isPlaying])
      return null
    }

    render(<HookWrapper />)

    await waitFor(() => {
      expect(autoplayIsPlaying).toBe(true)
    })
  })

  it('toggleAutoplay를 호출하면 stop과 play가 순서대로 실행되어야 한다', async () => {
    const HookWrapper = () => {
      const { toggleAutoplay } = useAutoplay(
        mockEmblaApi as unknown as EmblaCarouselType
      )

      useEffect(() => {
        toggleAutoplay()
        toggleAutoplay()
      }, [toggleAutoplay])

      return null
    }

    render(<HookWrapper />)

    await waitFor(() => {
      expect(autoplayMock.stop).toHaveBeenCalled()
      expect(autoplayMock.play).toHaveBeenCalled()
    })
  })

  it('onAutoplayButtonClick을 호출하면 stop과 콜백이 실행되어야 한다', async () => {
    const callback = vi.fn()

    const HookWrapper = () => {
      const { onAutoplayButtonClick } = useAutoplay(
        mockEmblaApi as unknown as EmblaCarouselType
      )

      // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
      useEffect(() => {
        onAutoplayButtonClick(callback)
      }, [])

      return null
    }

    render(<HookWrapper />)

    await waitFor(() => {
      expect(autoplayMock.stop).toHaveBeenCalled()
      expect(callback).toHaveBeenCalled()
    })
  })

  it('stopOnInteraction이 false일 때 onAutoplayButtonClick은 reset과 콜백을 실행해야 한다', async () => {
    autoplayMock.options.stopOnInteraction = false

    const callback = vi.fn()

    const HookWrapper = () => {
      const { onAutoplayButtonClick } = useAutoplay(
        mockEmblaApi as unknown as EmblaCarouselType
      )

      // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
      useEffect(() => {
        onAutoplayButtonClick(callback)
      }, [])

      return null
    }

    render(<HookWrapper />)

    await waitFor(() => {
      expect(autoplayMock.reset).toHaveBeenCalled()
      expect(callback).toHaveBeenCalled()
    })
  })

  it('autoplay 이벤트가 발생하면 autoplayIsPlaying 상태가 반영되어야 한다', async () => {
    let autoplayIsPlaying = false

    const HookWrapper = () => {
      const { autoplayIsPlaying: isPlaying } = useAutoplay(
        mockEmblaApi as unknown as EmblaCarouselType
      )

      useEffect(() => {
        autoplayIsPlaying = isPlaying
      }, [isPlaying])

      return null
    }

    render(<HookWrapper />)

    act(() => {
      mockEmblaApi.emit('autoplay:stop')
    })

    await waitFor(() => {
      expect(autoplayIsPlaying).toBe(false)
    })

    act(() => {
      mockEmblaApi.emit('autoplay:play')
    })

    await waitFor(() => {
      expect(autoplayIsPlaying).toBe(true)
    })
  })
})

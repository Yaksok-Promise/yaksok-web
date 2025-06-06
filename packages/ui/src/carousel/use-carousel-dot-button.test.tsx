import { act, renderHook } from '@testing-library/react'
import type { EmblaCarouselType } from 'embla-carousel'
import { describe, expect, it, vi } from 'vitest'
import { useDotButton } from './use-carousel-dot-button'

const createEmblaMock = (): EmblaCarouselType => {
  const listeners: Record<string, Function[]> = {}

  const emblaMock = {
    scrollTo: vi.fn(),
    scrollSnapList: vi.fn().mockReturnValue([0, 1, 2]),
    selectedScrollSnap: vi.fn().mockReturnValue(1),
    canScrollNext: () => true,
    canScrollPrev: () => true,
    containerNode: () => document.createElement('div'),
    slideNodes: () => [],
    on: vi.fn().mockImplementation((event: string, callback: Function) => {
      listeners[event] = listeners[event] || []
      listeners[event].push(callback)
      return emblaMock
    }),
    emit: (event: string) => {
      listeners[event]?.forEach(cb => cb(emblaMock))
    },
  }

  return emblaMock as unknown as EmblaCarouselType
}

describe('useDotButton', () => {
  it('초기화 시 scrollSnaps와 selectedIndex가 설정되어야 한다', () => {
    const emblaMock = createEmblaMock()
    const { result } = renderHook(() => useDotButton(emblaMock))

    expect(result.current.scrollSnaps).toEqual([0, 1, 2])
    expect(result.current.selectedIndex).toBe(1)
  })

  it('onDotButtonClick 호출 시 embla.scrollTo가 호출되어야 한다', () => {
    const emblaMock = createEmblaMock()
    const { result } = renderHook(() => useDotButton(emblaMock))

    act(() => {
      result.current.onDotButtonClick(2)
    })

    expect(emblaMock.scrollTo).toHaveBeenCalledWith(2)
  })

  it('onButtonClick 콜백이 주어진 경우 해당 콜백도 호출되어야 한다', () => {
    const emblaMock = createEmblaMock()
    const onButtonClick = vi.fn()

    const { result } = renderHook(() => useDotButton(emblaMock, onButtonClick))

    act(() => {
      result.current.onDotButtonClick(1)
    })

    expect(onButtonClick).toHaveBeenCalledWith(emblaMock)
  })

  it('select 이벤트 발생 시 selectedIndex가 변경되어야 한다', () => {
    const emblaMock = createEmblaMock()
    const { result } = renderHook(() => useDotButton(emblaMock))

    vi.spyOn(emblaMock, 'selectedScrollSnap').mockReturnValue(0)

    act(() => {
      emblaMock.emit('select')
    })

    expect(result.current.selectedIndex).toBe(0)
  })
})

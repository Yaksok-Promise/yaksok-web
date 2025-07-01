import type { DebouncedFunc } from 'lodash' // ✅ 타입만 lodash에서 import
import debounce from 'lodash.debounce'
import { useCallback, useRef } from 'react'

export const useDebounce = () => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const debouncedFnRef = useRef<DebouncedFunc<(...args: any[]) => void> | null>(
    null
  )

  return useCallback(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    <T extends (...args: any[]) => void>(callback: T, delay: number) => {
      // 이전 debounce 함수가 있다면 취소
      if (debouncedFnRef.current) {
        debouncedFnRef.current.cancel()
      }

      const debounced = debounce(callback, delay)
      debouncedFnRef.current = debounced

      return (...args: Parameters<T>): void => {
        debounced(...args)
      }
    },
    []
  )
}

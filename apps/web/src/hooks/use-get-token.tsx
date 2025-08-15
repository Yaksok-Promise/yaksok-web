// context/TokenContext.tsx
import { useEffect } from 'react'
import { useLoginStore } from '@yaksok/store'

export const useGetToken = () => {
  const { saveToken } = useLoginStore()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const handleTokenMessage = (event: MessageEvent) => {
      const { type, payload } = JSON.parse(event.data)

      // 토큰 저장
      if (type === 'SAVE_TOKEN' && payload?.token) {
        saveToken(payload.token)
        window.ReactNativeWebView?.postMessage(
          JSON.stringify({ type: 'SAVE_TOKEN', token: payload.token })
        )
      }

      // 토큰 재발급
      if (type === 'REISSUE_TOKEN' && payload?.token) {
        saveToken(payload.token)
        window.ReactNativeWebView?.postMessage(
          JSON.stringify({ type: 'REISSUE_TOKEN', token: payload.token })
        )
      }
    }

    window.addEventListener('message', handleTokenMessage)
    document.addEventListener('message', handleTokenMessage as EventListener)
    return () => {
      window.removeEventListener('message', handleTokenMessage)
      document.removeEventListener(
        'message',
        handleTokenMessage as EventListener
      )
    }
  }, [])
}

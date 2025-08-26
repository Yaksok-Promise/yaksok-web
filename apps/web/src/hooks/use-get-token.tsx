import { useLoginStore } from '@yaksok/store'
// context/TokenContext.tsx
import { useEffect } from 'react'

export const useGetToken = () => {
  const { saveAccessToken, saveRefreshToken } = useLoginStore()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const handleTokenMessage = (event: MessageEvent) => {
      if (!window.ReactNativeWebView) return
      const { type, payload } = JSON.parse(event.data as string)
      console.log(type, payload)

      // 토큰 저장
      if (
        type === 'SAVE_TOKEN' &&
        payload?.accessToken &&
        payload?.refreshToken
      ) {
        saveAccessToken(payload.accessToken)
        saveRefreshToken(payload.refreshToken)
        window.ReactNativeWebView?.postMessage(
          JSON.stringify({
            type: 'SAVE_TOKEN',
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
          })
        )
      }

      // 토큰 재발급
      if (type === 'REISSUE_TOKEN' && payload?.token) {
        saveRefreshToken(payload.token)
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

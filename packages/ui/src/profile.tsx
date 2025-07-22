import React from 'react'

import { Camera, UnknownProfile } from '@yaksok/icons'
import { useEffect, useState } from 'react'

export type ProfileProps = {
  profileUrl?: string
  size?: number
  isCamera?: boolean
}

export function Profile({
  profileUrl,
  size = 64,
  isCamera = false,
}: ProfileProps) {
  const [error, setError] = useState(false)

  const handleOpenImagePicker = () => {
    // WebView → Native 호출
    const message = JSON.stringify({ type: 'OPEN_IMAGE_PICKER' })
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(message)
    } else {
      console.warn('브릿지 미탑재 환경입니다.')
    }
  }

  const showDefault = !profileUrl || error

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const { type, data } = JSON.parse(event.data)
        if (type === 'SELECTED_IMAGE') {
          // TODO: data.url을 서버로 업로드
          console.log('선택된 이미지 URL:', data.url)
        }
      } catch (e) {
        console.warn('잘못된 브릿지 메시지 형식', e)
      }
    }
    if (isCamera) {
      window.addEventListener('message', handleMessage)
    }
    return () => window.removeEventListener('message', handleMessage)
  }, [isCamera])

  return (
    <div
      className="relative rounded-full"
      style={{ width: size, height: size }}
    >
      {showDefault ? (
        <UnknownProfile size={size} />
      ) : (
        <img
          src={profileUrl}
          alt="프로필 이미지"
          className="h-full w-full rounded-full object-cover"
          onError={() => setError(true)}
        />
      )}

      {isCamera && (
        <button
          type="button"
          onClick={handleOpenImagePicker}
          className="absolute right-0 bottom-0 h-6 w-6 rounded-full border-[1px] border-gray06 bg-white p-1"
        >
          <Camera size={14} />
        </button>
      )}
    </div>
  )
}

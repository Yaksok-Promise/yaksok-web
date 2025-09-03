import { useStore } from 'zustand'
import { createStore } from 'zustand/vanilla'

export interface LoginStore {
  accessToken: null | string
  refreshToken: null | string
  saveAccessToken: (token: string) => void
  saveRefreshToken: (token: string) => void
  removeAccessToken: () => void
  removeRefreshToken: () => void
  isLoggedIn: () => boolean
}

// 상태 관리를 위한 store 객체 생성
export const loginStore = createStore<LoginStore>((set, get) => ({
  accessToken: null,
  refreshToken: null,
  saveAccessToken: (token: string) => set({ accessToken: token }),
  saveRefreshToken: (token: string) => set({ refreshToken: token }),
  removeAccessToken: () => set({ accessToken: null }),
  removeRefreshToken: () => set({ refreshToken: null }),
  isLoggedIn: () => !!get().accessToken && !!get().refreshToken,
}))

export const useLoginStore = () => useStore(loginStore)

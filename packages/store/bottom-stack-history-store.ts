import {
  APPOINTMENTPAGE,
  BOTTOMSTACKPAGE,
  COMMUNITYPAGE,
  LOUNGEPAGE,
  MAINPAGE,
  MYPAGE,
} from '@yaksok/utils'
import { createStore, useStore } from 'zustand'

export const isMainPage = (page: string): page is MAINPAGE =>
  page === 'MainPage'

export const isCommunityPage = (page: string): page is COMMUNITYPAGE =>
  page === 'GeneralForumPage' || page === 'GeneralForumMenuPage'

export const isLoungePage = (page: string): page is LOUNGEPAGE =>
  page === 'MagazinePage'

export const isAppointmentPage = (page: string): page is APPOINTMENTPAGE =>
  page === 'ComparePage'

export const isMyPage = (page: string): page is MYPAGE =>
  page === 'Mypage' || page === 'ProfilePage'

export const isBottomStackPage = (page: string): page is BOTTOMSTACKPAGE =>
  isMainPage(page) ||
  isCommunityPage(page) ||
  isLoungePage(page) ||
  isAppointmentPage(page) ||
  isMyPage(page)

export interface BottomStackHistoryStore {
  bottomStackHistory: {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    main: { name: MAINPAGE; params: { [key: string]: any } | undefined }

    community: // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    { name: COMMUNITYPAGE; params: { [key: string]: any } | undefined }
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    lounge: { name: LOUNGEPAGE; params: { [key: string]: any } | undefined }

    appointment: // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    { name: APPOINTMENTPAGE; params: { [key: string]: any } | undefined }

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    my: { name: MYPAGE; params: { [key: string]: any } | undefined }
  }
  addHistory: (history: {
    name: string
    params: Record<string, unknown>
  }) => void
}

export const bottomStackHistoryStore = createStore<BottomStackHistoryStore>(
  (set, get) => ({
    bottomStackHistory: {
      main: { name: 'MainPage', params: {} },
      community: { name: 'GeneralForumPage', params: {} },
      lounge: { name: 'MagazinePage', params: {} },
      appointment: { name: 'ComparePage', params: {} },
      my: { name: 'Mypage', params: {} },
    },
    addHistory: (history: {
      name: string
      params: Record<string, unknown>
    }) => {
      const { name, params } = history
      if (isMainPage(name)) {
        set({
          bottomStackHistory: {
            ...get().bottomStackHistory,
            main: { name, params },
          },
        })
      }
      if (isCommunityPage(name)) {
        set({
          bottomStackHistory: {
            ...get().bottomStackHistory,
            community: { name, params },
          },
        })
      }
      if (isLoungePage(name)) {
        set({
          bottomStackHistory: {
            ...get().bottomStackHistory,
            lounge: { name, params },
          },
        })
      }
      if (isAppointmentPage(name)) {
        set({
          bottomStackHistory: {
            ...get().bottomStackHistory,
            appointment: { name, params },
          },
        })
      }
      if (isMyPage(name)) {
        set({
          bottomStackHistory: {
            ...get().bottomStackHistory,
            my: { name, params },
          },
        })
      }
      set({
        bottomStackHistory: {
          ...get().bottomStackHistory,
        },
      })
    },
  })
)

export const useBottomStackHistoryStore = () =>
  useStore(bottomStackHistoryStore)

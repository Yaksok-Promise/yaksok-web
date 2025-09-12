import { useStore } from 'zustand'
import { createStore } from 'zustand/vanilla'

export type Category = 'DAILY' | 'REVIEW' | 'ALL' | 'QUESTION'

export type CategoryToKorean = '잡담·일상' | '후기' | '전체' | '질문'

export interface MagazineStore {
  title: string
  tagNames: string[]
  category: Category
  files: Map<string, File>
  registerFile: (name: string, file: File) => void
  setTitle: (title: string) => void
  setTagNames: (tagNames: string[]) => void
  setCategory: (category: Category) => void
  clear: () => void
}

// 상태 관리를 위한 store 객체 생성
export const magazineStore = createStore<MagazineStore>((set, get) => ({
  title: '',
  tagNames: [],
  category: 'ALL',
  files: new Map(),
  registerFile: (name: string, file: File) =>
    set({ files: get().files.set(name, file) }),
  setTitle: (title: string) => set({ title }),
  setTagNames: (tagNames: string[]) => set({ tagNames }),
  setCategory: (category: Category) => set({ category }),
  clear: () =>
    set({ files: new Map(), title: '', tagNames: [], category: 'ALL' }),
}))

export const useMagazineStore = () => useStore(magazineStore)

import { useStore } from 'zustand'
import { createStore } from 'zustand/vanilla'

export type Category = 'DAILY' | 'REVIEW' | 'QUESTION'

export type CategoryToKorean = '잡담·일상' | '후기' | '전체' | '질문'

type Tag = {
  id: string
  name: string
}

type MimeImage =
  | 'image/apng'
  | 'image/avif'
  | 'image/gif'
  | 'image/jpeg'
  | 'image/png'
  | 'image|svg+xml'
  | 'image/webp'

type Image = {
  id: string
  imageUrl: string
  mimeType: MimeImage
}

export interface MagazineStore {
  title: string
  tags: Tag[]
  category: Category
  images: Map<string, File>
  prevImages: Image[]
  registerImage: (name: string, file: File) => void
  setTitle: (title: string) => void
  setTags: (tags: Tag[]) => void
  setCategory: (category: Category) => void
  setPrevImages: (images: Image[]) => void
  clear: () => void
}

// 상태 관리를 위한 store 객체 생성
export const magazineStore = createStore<MagazineStore>((set, get) => ({
  title: '',
  tags: [],
  category: 'DAILY' as Category,
  images: new Map(),
  prevImages: [],
  registerImage: (name: string, file: File) =>
    set({ images: get().images.set(name, file) }),
  setTitle: (title: string) => set({ title }),
  setTags: (tags: Tag[]) => set({ tags }),
  setCategory: (category: Category) => set({ category }),
  setPrevImages: (images: Image[]) => set({ prevImages: images }),
  clear: () =>
    set({
      images: new Map(),
      title: '',
      tags: [],
      category: 'DAILY',
      prevImages: [],
    }),
}))

export const useMagazineStore = () => useStore(magazineStore)

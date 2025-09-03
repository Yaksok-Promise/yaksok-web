import { MimeImage, Tag } from './comment'
import { Pagination } from './pagination'

export type Image = {
  id: string
  imageUrl: string
  mimeType: MimeImage
}

// 메거진 관련 Type

export type Magazine = {
  id: string
  title: string
  author: string
  body: string
  createdAt: string
  thumbnailUrl: string
  likes: number
  views: number
  commentCount: number
  tags: Tag[]
  hasImages: boolean
}

export type MagazineDetail = Magazine & {
  images: Image[]
  magazineType: string
  aboutMedicineList: string // ex. 아스파린, 타이레놀
  instagramUrl: string
  liked: boolean
  mine: boolean
}

export type MagazineListResponse = Pagination & {
  content: Magazine[]
}

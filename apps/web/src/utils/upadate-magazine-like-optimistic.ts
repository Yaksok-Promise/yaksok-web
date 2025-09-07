import {
  GeneralForumDetail,
  MagazineDetail,
} from '@yaksok/api/boardMagazineType'

export function updateMagazineLikeOptimistic<
  T extends MagazineDetail | GeneralForumDetail,
>(magazineData: T | undefined): T | undefined {
  if (!magazineData) return magazineData
  const nextLiked = !magazineData.liked
  const delta = nextLiked ? 1 : -1
  return {
    ...magazineData,
    liked: nextLiked,
    likes: Math.max(0, ((magazineData.likes as number) ?? 0) + delta),
  }
}

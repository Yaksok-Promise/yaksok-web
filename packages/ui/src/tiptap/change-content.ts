import { Image } from '@yaksok/api/boardMagazineType'

export const changeContent = (content: string, images: Image[]) => {
  let index = 0
  return content.replace(/<img[^>]*src="([^"]*)"[^>]*>/g, match => {
    if (index < images.length) {
      const newImgTag = match.replace(
        /src="([^"]*)"/,
        `src="${images[index].imageUrl}"`
      )
      index++
      return newImgTag
    }
    return match
  })
}

// image.ts
import TiptapImage from '@tiptap/extension-image'
import { magazineStore } from '@yaksok/store'

export const ImageWithMeta = TiptapImage.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      name: {
        default: null,
        parseHTML: element => element.getAttribute('data-name'),
        renderHTML: attrs => {
          if (!attrs.name) return {}
          return { 'data-name': attrs.name }
        },
      },
    }
  },
})

export function uid(prefix = 'img') {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 7)}`
}

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
function matchUid(name: string, prefix = 'img') {
  const re = new RegExp(`^${escapeRe(prefix)}-[a-z0-9]+-[a-z0-9]{5}$`)
  return re.test(name)
}

export function makeImageAttrsFromFile(file: File) {
  const { registerImage } = magazineStore.getState()
  const objectUrl = URL.createObjectURL(file)
  const altName = uid()
  if (!matchUid(file.name)) {
    registerImage(altName, file)
  } else {
    registerImage(file.name, file)
  }

  return { src: objectUrl, alt: altName, name: file.name }
}

// 붙여넣기 이미지 File로 변환
export async function fileFromRemoteURL(url: string): Promise<File> {
  const res = await fetch(url, { mode: 'cors' }) // CORS 허용 필요
  const blob = await res.blob()
  const ext = (
    url.match(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i)?.[1] ?? 'png'
  ).toLowerCase()
  const name = uid()
  return new File([blob], name, { type: blob.type || `image/${ext}` })
}

export function isLikelyImageURL(text: string) {
  return /^data:image\/|^https?:\/\/.+\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i.test(
    text.trim()
  )
}

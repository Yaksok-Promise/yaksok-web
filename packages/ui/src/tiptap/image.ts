// image.ts
import TiptapImage from '@tiptap/extension-image'

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

export function makeImageAttrsFromFile(file: File) {
  const objectUrl = URL.createObjectURL(file)
  const baseName = file.name?.replace(/\.[^.]+$/, '') || 'image'
  const alt = `${baseName}-${uid()}`
  const name = file.name || alt
  return { src: objectUrl, alt, name }
}

export function isLikelyImageURL(text: string) {
  return /^data:image\/|^https?:\/\/.+\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i.test(
    text.trim()
  )
}

import { Image } from '@yaksok/api/boardMagazineType'

/** URL 비교 시 ?query, #hash 제거해서 비교(서버가 서명쿼리 붙여줄 수 있음) */
function normalizeSrc(src: string) {
  try {
    const u = new URL(src, window.location.origin)
    u.search = ''
    u.hash = ''
    return u.toString()
  } catch {
    // blob:, data: 등은 그대로
    return src
  }
}

function isLocalSrc(src: string) {
  return src.startsWith('blob:') || src.startsWith('data:')
}

function isInPrev(src: string, prev: Image[]) {
  const norm = normalizeSrc(src)
  return prev.some(p => normalizeSrc(p.imageUrl) === norm)
}

/** DOM에서 <img> 모두 뽑기 */
function getImgsFromHTML(html: string): HTMLImageElement[] {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return Array.from(doc.querySelectorAll('img'))
}

/**
 * 편집 저장 시 이미지 분류:
 * - keepImages: 본문에 여전히 존재하는 prevImages의 id 배열
 * - newImages: 새로 추가된 이미지 File 배열(중복 제거)
 * - removedImageIds: (옵션) 본문에서 빠진 prevImages id (서버가 필요하면 사용)
 */
export function splitImagesForEdit(params: {
  prevImages: Image[]
  images: Map<string, File> // magazineStore.images (name/alt/filename 등으로 registerImage된 맵)
  contentHTML: string // 반드시 editor.getHTML() 결과를 넣을 것
}) {
  const { prevImages, images, contentHTML } = params
  const imgEls = getImgsFromHTML(contentHTML)

  // 1) keepImages: 본문에 남아있는 prevImage URL들의 id
  const usedSrcSet = new Set(
    imgEls.map(img => normalizeSrc(img.getAttribute('src') || ''))
  )
  const keepImages = prevImages
    .filter(p => usedSrcSet.has(normalizeSrc(p.imageUrl)))
    .map(p => p.id)

  // (옵션) 삭제된 기존 이미지 id
  const removedImageIds = prevImages
    .filter(p => !usedSrcSet.has(normalizeSrc(p.imageUrl)))
    .map(p => p.id)

  // 2) newImages: 본문에 있는 새 이미지(File). alt 또는 data-name으로 Map에서 찾기
  const seen = new Set<string>()
  const newImages: { file: File; name: string }[] = []

  for (const img of imgEls) {
    const src = img.getAttribute('src') || ''
    const nameKey = (
      img.getAttribute('data-name') ||
      img.getAttribute('alt') ||
      ''
    ).trim()

    const shouldTreatAsNew = isLocalSrc(src) || !isInPrev(src, prevImages) // 로컬(blob/data) 또는 prev에 없음

    if (!shouldTreatAsNew) continue
    if (!nameKey || seen.has(nameKey)) continue

    // 1순위: nameKey(alt/data-name)로 찾기
    let file = images.get(nameKey)

    // 2순위(예비): 파일명으로 추정해서 찾기 (예: src가 blob이지만 alt 누락된 경우 대비)
    if (!file) {
      const filenameFromSrc = src.split('/').pop()?.split('?')[0] || ''
      if (filenameFromSrc) {
        file = images.get(filenameFromSrc)
      }
    }

    if (file) {
      newImages.push({ name: nameKey, file })
      seen.add(nameKey)
    }
  }

  return { keepImages, newImages, removedImageIds }
}

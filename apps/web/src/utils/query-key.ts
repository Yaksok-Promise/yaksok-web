export const QUERY_KEY = {
  MY_INFO: 'myInfo',
}

// 메거진
export const MAGAZINE_CATEGORY = {
  All: '전체',
  MEDICINE: '의약',
  LIFE: '웰빙·라이프스타일',
}

export type MagazineCategory =
  (typeof MAGAZINE_CATEGORY)[keyof typeof MAGAZINE_CATEGORY]

export type MagazineCategoryKey = keyof typeof MAGAZINE_CATEGORY

// 라운지
export const LOUNGE_CATEGORY = {
  All: '전체',
  QUESTION: '질문',
  REVIEW: '후기',
  DIALY: '잡담·일상',
}

export type LoungeCategory =
  (typeof LOUNGE_CATEGORY)[keyof typeof LOUNGE_CATEGORY]

export type LoungeCategoryKey = keyof typeof LOUNGE_CATEGORY

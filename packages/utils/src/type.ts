export type NotEmptyArray<T> = [T, ...T[]]

export type MAINPAGE = 'MainPage'
export type COMMUNITYPAGE =
  | 'GeneralForumPage'
  | 'GeneralForumDetailPage'
  | 'GeneralForumMenuPage'

export type LOUNGEPAGE =
  | 'MagazinePage'
  | 'MagazineDetailPage'
  | 'MagazineListPage'
  | 'MagazineMenuPage'
  | 'MagazineYakinStoryPage'

export type APPOINTMENTPAGE = 'ComparePage'

export type MYPAGE = 'Mypage' | 'ProfilePage'

export type BOTTOMSTACKPAGE =
  | MAINPAGE
  | COMMUNITYPAGE
  | LOUNGEPAGE
  | APPOINTMENTPAGE
  | MYPAGE

export function isValidDate(dateStr: string): boolean {
  // 1. 8자리 숫자인지 확인
  if (!/^\d{8}$/.test(dateStr)) return false

  // 2. 연, 월, 일 분리
  const year = parseInt(dateStr.slice(0, 4), 10)
  const month = parseInt(dateStr.slice(4, 6), 10)
  const day = parseInt(dateStr.slice(6, 8), 10)

  // 3. 날짜 객체 생성
  const date = new Date(year, month - 1, day)

  // 4. 날짜 유효성 확인
  const isValid =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day

  if (!isValid) return false

  // 5. 오늘 날짜보다 과거인지 확인
  const today = new Date()
  today.setHours(0, 0, 0, 0) // 시간 무시

  return date <= today
}

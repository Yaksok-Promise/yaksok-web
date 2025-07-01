export const slicePhoneNumber = (value: string) => {
  const numbersOnly = value.replace(/\D/g, '') // 숫자만 남기기
  if (numbersOnly.length < 4) return numbersOnly
  if (numbersOnly.length < 8) {
    return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`
  }
  return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`
}

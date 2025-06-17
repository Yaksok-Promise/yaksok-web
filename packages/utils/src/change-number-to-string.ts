export const changeNumberToString = (
  number: number,
  start?: { len: number; str: string },
  end?: { len: number; str: string }
) => {
  let str = number.toString()

  if (start) {
    str = str.padStart(start.len, start.str)
  }

  if (end) {
    str = str.padEnd(end.len, end.str)
  }

  return str
}

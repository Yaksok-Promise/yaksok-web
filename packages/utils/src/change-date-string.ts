export const changeDate = (date: string, mode: 'date' | 'time' = 'date') => {
  const dateObj = new Date(date)
  const year = dateObj.getFullYear()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const day = String(dateObj.getDate()).padStart(2, '0')
  const time = String(dateObj.getHours()).padStart(2, '0')
  const minute = String(dateObj.getMinutes()).padStart(2, '0')
  if (mode === 'date') {
    return `${year}.${month}.${day}`
  } else {
    return `${year}.${month}.${day} ${time}:${minute}`
  }
}

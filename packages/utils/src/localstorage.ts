export const setItem = (key: string, value: string) => {
  localStorage.setItem(key, value)
}

export const getItem = (key: string) => {
  return localStorage.getItem(key)
}

export const removeItem = (key: string) => {
  localStorage.removeItem(key)
}

export const LOCAL_STORAGE_KEY = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
}

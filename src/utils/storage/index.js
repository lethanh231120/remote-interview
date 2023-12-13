import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export const STORAGEKEY = {
  USER_INFO: `user_info`,
}

export const setCookie = (key, value) => {
  cookies.set(key, value)
}

export const getCookie = (key) => cookies.get(key)
export const removeCookie = (key) => cookies.remove(key)

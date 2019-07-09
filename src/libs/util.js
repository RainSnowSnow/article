import Cookies from 'js-cookie'



export const TOKEN_KEY = 'token'

export const setToken = (token) => {
  var inFifteenMinutes = new Date(new Date().getTime() + 1 * 60 * 1000)
  Cookies.set(TOKEN_KEY, token, { expires:inFifteenMinutes })
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}
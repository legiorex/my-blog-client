const baseURL = process.env.REACT_APP_BASE_URL
const path = {
  posts: '/posts',
  signUp: '/auth/sign-up',
  signIn: '/auth/sign-in',
  user: '/user',
}
const isDev = process.env.NODE_ENV === 'development'

export { isDev, baseURL, path }

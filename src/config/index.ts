const baseURL = process.env.REACT_APP_BASE_URL
const path = {
  posts: '/posts',
}
const isDev = process.env.NODE_ENV === 'development'

export { isDev, baseURL, path }

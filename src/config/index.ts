const baseURL = process.env.REACT_APP_BASE_URL
const path = {
  posts: '/posts',
  postsCreate: '/posts/create',
  postsEdit: '/posts/edit',
  signUp: '/auth/sign-up',
  signIn: '/auth/sign-in',
  user: '/user',
  uploads: '/uploads',
}
const isDev = process.env.NODE_ENV === 'development'

export { isDev, baseURL, path }

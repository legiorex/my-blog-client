export type UserType = {
  _id: string
  fullName: string
  email: string
  avatarUrl?: string
}

export type PostType = {
  _id: string
  title: string
  text: string
  tags?: string[]
  imageUrl?: string
  viewsCount: number
  user: UserType
  createdAt: Date
}

export type UserSingIn = Pick<UserType, 'email'> & { password: string }

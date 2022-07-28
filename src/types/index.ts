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

export type UserSingInRequest = Pick<UserType, 'email'> & { password: string }
export type UserSingInResponse = UserType & { token: string }

export type UserSingUpRequest = Omit<UserType, '_id'> & { password: string }
export type UserSingUpResponse = UserSingInResponse

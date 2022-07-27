import { createSlice } from '@reduxjs/toolkit'
import { UserType } from 'types'

type UserState = {
  user: UserType | null
  isLoading: boolean
  error: string
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
})

export default userSlice.reducer

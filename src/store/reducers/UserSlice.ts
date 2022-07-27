import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UserType } from 'types'

import { fetchSingIn, fetchSingUp } from '../actions'

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
  reducers: {
    logout: (state) => {
      state.user = null
    },
  },
  extraReducers: {
    [fetchSingUp.pending.type]: (state) => {
      state.isLoading = true
    },
    [fetchSingUp.fulfilled.type]: (state, action: PayloadAction<UserType>) => {
      state.isLoading = false
      state.user = action.payload
    },
    [fetchSingUp.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [fetchSingIn.pending.type]: (state) => {
      state.isLoading = true
    },
    [fetchSingIn.fulfilled.type]: (state, action: PayloadAction<UserType>) => {
      state.isLoading = false
      state.user = action.payload
    },
    [fetchSingIn.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export default userSlice.reducer

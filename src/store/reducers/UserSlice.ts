import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UserType } from 'types'

import { fetchSingUp } from '../actions'

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
  },
})

export default userSlice.reducer

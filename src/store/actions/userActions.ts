import { createAsyncThunk } from '@reduxjs/toolkit'
import api from 'api'
import axios from 'axios'
import { path } from 'config'
import { UserType } from 'types'

export const fetchSingUp = createAsyncThunk('user/fetchSingUp', async (params, thunkAPI) => {
  try {
    const { data } = await api.post<UserType>(path.signUp, params)

    return data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue((error.response.data as Error).message)
    }

    return thunkAPI.rejectWithValue('Не удалось зарегистрироваться')
  }
})

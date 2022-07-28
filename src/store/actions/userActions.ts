import { createAsyncThunk } from '@reduxjs/toolkit'
import api from 'api'
import axios from 'axios'
import { path } from 'config'
import { UserSingInRequest, UserSingInResponse, UserSingUpRequest, UserSingUpResponse, UserType } from 'types'
import { setToken } from 'utils'

export const fetchSingUp = createAsyncThunk<UserSingUpResponse, UserSingUpRequest>(
  'user/fetchSingUp',
  async (params, thunkAPI) => {
    try {
      const { data } = await api.post<UserSingUpResponse>(path.signUp, params)
      setToken(data.token)
      return data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue((error.response.data as Error).message)
      }

      return thunkAPI.rejectWithValue('Не удалось зарегистрироваться')
    }
  },
)

export const fetchSingIn = createAsyncThunk<UserSingInResponse, UserSingInRequest>(
  'user/fetchSingIn',
  async (params, thunkAPI) => {
    try {
      const { data } = await api.post<UserSingInResponse>(path.signIn, params)
      setToken(data.token)
      return data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue((error.response.data as Error).message)
      }

      return thunkAPI.rejectWithValue('Не удалось зарегистрироваться')
    }
  },
)
export const fetchUser = createAsyncThunk('user/fetchUser', async (_, thunkAPI) => {
  try {
    const { data } = await api.get<UserType>(path.user)

    return data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue((error.response.data as Error).message)
    }

    return thunkAPI.rejectWithValue('Пользователь не найден')
  }
})

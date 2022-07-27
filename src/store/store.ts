import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { isDev } from 'config'

import { postsReducer, userReducer } from './reducers'

const rootReducer = combineReducers({ user: userReducer, posts: postsReducer })

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: isDev,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

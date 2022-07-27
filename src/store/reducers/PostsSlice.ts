import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fetchPosts } from 'store/actions'
import { PostType } from 'types'

type PostsState = {
  posts: PostType[]
  isLoading: boolean
  error: string
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: '',
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.fulfilled.type]: (state, action: PayloadAction<PostType[]>) => {
      state.isLoading = false
      state.posts = action.payload
    },
    [fetchPosts.pending.type]: (state) => {
      state.posts = []
      state.isLoading = true
    },
    [fetchPosts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.posts = []
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export default postsSlice.reducer

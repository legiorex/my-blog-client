import Post from '@components/Post/Post'
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useAppDispatch, useAppSelector } from 'hooks'
import { useEffect } from 'react'
import { fetchPosts } from 'store/actions'
import { PostType } from 'types'

import PostSkeleton from 'components/PostSkeleton/PostSkeleton'

const Home = () => {
  const dispatch = useAppDispatch()

  const { posts, isLoading } = useAppSelector((state) => state.posts)
  const { user } = useAppSelector((state) => state.user)

  useEffect(() => {
    if (!posts || !posts.length) {
      dispatch(fetchPosts())
    }
  }, [dispatch, posts])

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>

      <Grid container spacing={4}>
        <Grid xs={8} item>
          {isLoading && [...Array(5)].map((_, index: number) => <PostSkeleton key={index} />)}

          {!isLoading &&
            posts.map((post: PostType) => (
              <Post key={post._id} post={post} isEditable={user?._id === post.user._id} isFullPost={false} />
            ))}
        </Grid>
      </Grid>
    </>
  )
}

export default Home

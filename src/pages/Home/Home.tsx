import CommentsBlock from '@components/CommentsBlock/CommentsBlock'
import Post from '@components/Post/Post'
import TagsBlock from '@components/TagsBlock/TagsBlock'
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
            posts.map((post: PostType) => <Post key={post._id} post={post} isEditable isFullPost={false} />)}
        </Grid>
        <Grid xs={4} item>
          {/* <TagsBlock items={['react', 'typescript', 'заметки']} isLoading={false} /> */}
          {/* <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          /> */}
        </Grid>
      </Grid>
    </>
  )
}

export default Home

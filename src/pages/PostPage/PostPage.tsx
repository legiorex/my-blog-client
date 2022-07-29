import AddComment from '@components/AddComment/AddComment'
import CommentsBlock from '@components/CommentsBlock/CommentsBlock'
import Post from '@components/Post/Post'
import api from 'api'
import { path } from 'config'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import { PostType } from 'types'

import PostSkeleton from 'components/PostSkeleton/PostSkeleton'

// TODO render error

const PostPage = () => {
  const { id } = useParams()

  const [post, setPost] = useState<PostType | undefined>(undefined)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    api
      .get<PostType>(`${path.posts}/${id}`)
      .then((resolve) => {
        setPost(resolve.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  if (isLoading || !post) {
    return <PostSkeleton />
  }

  return (
    <>
      <Post post={post} isFullPost isEditable={false}>
        <ReactMarkdown>{post.text}</ReactMarkdown>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'Вася Пупкин',
              avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'Это тестовый комментарий 555555',
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
      >
        <AddComment />
      </CommentsBlock>
    </>
  )
}
export default PostPage

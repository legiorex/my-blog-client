import {
  ChatBubbleOutlineOutlined as CommentIcon,
  Clear as DeleteIcon,
  Edit as EditIcon,
  RemoveRedEyeOutlined as EyeIcon,
} from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import api from 'api'
import clsx from 'clsx'
import { path } from 'config'
import dayjs from 'dayjs'
import { useAppDispatch } from 'hooks'
import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { fetchPosts } from 'store/actions'
import { PostType } from 'types'

import UserInfo from '../UserInfo/UserInfo'
import styles from './Post.module.scss'

type Props = {
  post: PostType
  children?: ReactNode
  isFullPost: boolean
  isEditable: boolean
}

const IMAGE_URL =
  'https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png'

const Post: FC<Props> = ({ post, children, isFullPost, isEditable }) => {
  const dispatch = useAppDispatch()
  const { title, user, viewsCount, createdAt, _id: postId } = post
  const onClickRemove = () => {
    api
      .delete(`${path.posts}/${postId}`)
      .then(() => {
        dispatch(fetchPosts())
      })
      .catch((error) => {
        console.log('~ ~ file: Post.tsx ~ line 32 ~ onClickRemove ~ error', error)
      })
  }
  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${postId}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}

      <img
        className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
        src={post.imageUrl ? post.imageUrl : IMAGE_URL}
        alt={title}
      />

      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={dayjs(createdAt).format('D MMM YYYY')} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${postId}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {post.tags &&
              post.tags.map((name) => (
                <li key={name}>
                  <Link to={`/tag/${name}`}>#{name}</Link>
                </li>
              ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>3</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Post

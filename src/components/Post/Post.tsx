import {
  ChatBubbleOutlineOutlined as CommentIcon,
  Clear as DeleteIcon,
  Edit as EditIcon,
  RemoveRedEyeOutlined as EyeIcon,
} from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import clsx from 'clsx'
import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import PostSkeleton from '../PostSkeleton/PostSkeleton'
import UserInfo from '../UserInfo/UserInfo'
import styles from './Post.module.scss'

type Props = {
  id: string
  title: string
  createdAt: string
  imageUrl: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any
  viewsCount: number
  commentsCount: number
  tags: string[]
  children?: ReactNode
  isFullPost: boolean
  isLoading: boolean
  isEditable: boolean
}

const Post: FC<Props> = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  if (isLoading) {
    return <PostSkeleton />
  }

  const onClickRemove = () => {
    console.log('first')
  }

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img className={clsx(styles.image, { [styles.imageFull]: isFullPost })} src={imageUrl} alt={title} />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags.map((name) => (
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
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Post

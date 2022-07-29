import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import api from 'api'
import { path } from 'config'
import { Options } from 'easymde'
import 'easymde/dist/easymde.min.css'
import { useIsAuth } from 'hooks'
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import SimpleMDE from 'react-simplemde-editor'
import { PostType } from 'types'

import styles from './CreatePost.module.scss'

const CreatePost = () => {
  const navigate = useNavigate()
  const params = useParams()

  const editPostId = params.id

  const [post, setPost] = useState<Pick<PostType, 'title' | 'text' | 'imageUrl' | 'tags'>>({
    title: '',
    text: '',
    imageUrl: '',
    tags: [],
  })

  useEffect(() => {
    if (editPostId) {
      api
        .get<PostType>(`${path.posts}/${editPostId}`)
        .then(({ data }) => {
          setPost({
            title: data.title,
            text: data.text,
            imageUrl: data.imageUrl || '',
            tags: data.tags || [],
          })
        })
        .catch((error) => {
          console.log('~ ~ file: CreatePost.tsx ~ line 32 ~ api.post ~ error', error)
        })
    }
  }, [editPostId])

  const inputImageRef = useRef<HTMLInputElement>(null)

  const isAuth = useIsAuth()

  const options = useMemo(
    () =>
      ({
        spellChecker: false,
        maxHeight: '400px',
        autofocus: true,
        placeholder: 'Введите текст...',
        status: false,
        autosave: {
          enabled: true,
          delay: 1000,
        },
      } as Options),
    [],
  )

  const onClickRemoveImage = () => {
    if (inputImageRef.current) {
      inputImageRef.current.value = ''
      inputImageRef.current.files = null
    }

    setPost((prev) => ({ ...prev, imageUrl: '' }))
  }

  const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return
    }
    const formData = new FormData()
    try {
      const file = event.target.files[0]
      formData.append('image', file)

      const { data } = await api.post(path.uploads, formData)

      setPost((prev) => ({ ...prev, imageUrl: `${process.env.REACT_APP_BASE_URL}${data.url}` }))
    } catch (error) {
      console.log('~ ~ file: CreatePost.tsx ~ line 61 ~ handleChangeFile ~ error', error)
    }
  }

  const onChangeText = useCallback((text: string) => {
    setPost((prev) => ({ ...prev, text }))
  }, [])

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value
    setPost((prev) => ({ ...prev, title }))
  }

  const onChangeTags = (event: ChangeEvent<HTMLInputElement>) => {
    const tags = event.target.value.split(' ')
    setPost((prev) => ({ ...prev, tags }))
  }

  const updatePost = () => {
    api
      .patch<PostType>(`${path.posts}/${editPostId}`, post)
      .then((response) => {
        const id = response.data._id
        navigate(`${path.posts}/${id}`)
      })
      .catch((error) => {
        console.log('~ ~ updatePost', error)
      })
  }

  const createPost = () => {
    api
      .post<PostType>(path.posts, post)
      .then((response) => {
        const id = response.data._id
        navigate(`${path.posts}/${id}`)
      })
      .catch((error) => {
        console.log('~ ~ CreatePost', error)
      })
  }

  const onSubmit = () => {
    if (!post.imageUrl) {
      delete post.imageUrl
    }

    if (editPostId) {
      updatePost()
    } else {
      createPost()
    }
  }

  if (!isAuth) {
    return <Navigate to="/" />
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputImageRef.current?.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input type="file" onChange={handleChangeFile} hidden ref={inputImageRef} />
      {post.imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} src={post.imageUrl} alt="Uploaded" />
        </>
      )}

      <br />
      <br />
      <TextField
        value={post.title}
        onChange={onChangeTitle}
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
      />
      <TextField
        onChange={onChangeTags}
        value={post.tags?.join(' ')}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
      />
      <SimpleMDE className={styles.editor} value={post.text} onChange={onChangeText} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {editPostId ? 'Обновить' : 'Опубликовать'}
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  )
}
export default CreatePost

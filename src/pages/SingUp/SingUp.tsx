import { useIsAuth } from '@hooks/auth'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import LoadingButton from '@mui/lab/LoadingButton'
import Avatar from '@mui/material/Avatar'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { fetchSingUp } from 'store/actions'
import { UserSingUpRequest } from 'types'

import styles from './SingUp.module.scss'

const SingUp = () => {
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.user)
  const isAuth = useIsAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserSingUpRequest>({
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
      avatarUrl: '',
    },
    mode: 'onChange',
  })

  const onSubmit = (values: UserSingUpRequest) => {
    if (!values.avatarUrl) {
      delete values.avatarUrl
    }

    dispatch(fetchSingUp(values))
  }

  if (isAuth) {
    return <Navigate to="/" replace />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Полное имя"
          fullWidth
          error={!!errors.fullName?.message}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Напишите ваше имя' })}
        />
        <TextField
          error={!!errors.email?.message}
          helperText={errors.email?.message}
          className={styles.field}
          label="E-Mail"
          fullWidth
          {...register('email', { required: 'Укажите почту' })}
        />
        <TextField
          className={styles.field}
          label="Пароль"
          fullWidth
          error={!!errors.password?.message}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
        />

        <LoadingButton loading={isLoading} disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </LoadingButton>
      </form>
    </Paper>
  )
}
export default SingUp

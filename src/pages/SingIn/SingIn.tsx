import LoadingButton from '@mui/lab/LoadingButton'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useAppDispatch, useAppSelector, useIsAuth } from 'hooks'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { fetchSingIn } from 'store/actions'
import { UserSingInRequest } from 'types'

import styles from './SingIn.module.scss'

const SingIn = () => {
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.user)
  const isAuth = useIsAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserSingInRequest>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit = (values: UserSingInRequest) => {
    dispatch(fetchSingIn(values))
  }

  if (isAuth) {
    return <Navigate to="/" replace />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Вход в аккаунт
        </Typography>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={!!errors.email?.message}
          helperText={errors.email?.message}
          fullWidth
          type="email"
          {...register('email', { required: 'Укажите почту' })}
        />
        <TextField
          type="password"
          className={styles.field}
          label="Пароль"
          fullWidth
          error={!!errors.password?.message}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
        />

        <LoadingButton loading={isLoading} disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Войти
        </LoadingButton>
      </form>
    </Paper>
  )
}

export default SingIn

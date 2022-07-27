import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useAppDispatch, useAppSelector } from 'hooks'
import { useForm } from 'react-hook-form'
import { fetchSingIn } from 'store/actions'
import { UserSingIn } from 'types'

import styles from './SingIn.module.scss'

const SingIn = () => {
  const dispatch = useAppDispatch()
  const { user, isLoading } = useAppSelector((state) => state.user)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<UserSingIn>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit = (values: UserSingIn) => {
    console.log('~ ~ file: SingUp.tsx ~ line 29 ~ SingUp ~ values', values)
    dispatch(fetchSingIn(values))
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

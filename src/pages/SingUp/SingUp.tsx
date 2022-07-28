import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'

import styles from './SingUp.module.scss'

const SingUp = () => {
  type FormValues = {
    email: string
    password: string
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: FormValues) => {
    console.log('~ ~ file: SingUp.tsx ~ line 29 ~ SingUp ~ values', values)
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form action="">
        <TextField className={styles.field} label="Полное имя" fullWidth />
        <TextField className={styles.field} label="E-Mail" fullWidth />
        <TextField className={styles.field} label="Пароль" fullWidth />
        <Button size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  )
}
export default SingUp

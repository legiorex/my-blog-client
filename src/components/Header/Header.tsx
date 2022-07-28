import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import { path } from 'config'
import { useAppDispatch, useIsAuth } from 'hooks'
import { Link } from 'react-router-dom'
import { userSlice } from 'store/reducers/UserSlice'
import { removeToken } from 'utils'

import styles from './Header.module.scss'

const Header = () => {
  const isAuth = useIsAuth()

  const dispatch = useAppDispatch()

  const { logout } = userSlice.actions

  const onClickLogout = () => {
    removeToken()
    dispatch(logout())
  }

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <a className={styles.logo} href="/">
            <div>BLOG</div>
          </a>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/posts/create">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to={path.signIn}>
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to={path.signUp}>
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Header

import Header from '@components/Header/Header'
import Container from '@mui/material/Container'
import CreatePost from '@pages/CreatePost/CreatePost'
import Home from '@pages/Home/Home'
import PostPage from '@pages/PostPage/PostPage'
import SingIn from '@pages/SingIn/SingIn'
import SingUp from '@pages/SingUp/SingUp'
import { path } from 'config'
import { Navigate, Route, Routes } from 'react-router-dom'

const App = () => (
  <>
    <Header />
    <Container maxWidth="lg">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path={path.signUp} element={<SingUp />} />
        <Route path={path.signIn} element={<SingIn />} />
        <Route path="/posts/create" element={<CreatePost />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="*" element={<Navigate replace to="/" />} /> */}
      </Routes>
    </Container>
  </>
)

export default App

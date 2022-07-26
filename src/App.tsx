import Header from '@components/Header/Header'
import Container from '@mui/material/Container'
import CreatePost from '@pages/CreatePost/CreatePost'
import Home from '@pages/Home/Home'
import PostPage from '@pages/PostPage/PostPage'
import SingUp from '@pages/SingUp/SingUp'

const App = () => (
  <>
    <Header />
    <Container>
      <Home />
      {/* <SingUp /> */}
      {/* <CreatePost /> */}
      {/* <PostPage /> */}
    </Container>
  </>
)

export default App

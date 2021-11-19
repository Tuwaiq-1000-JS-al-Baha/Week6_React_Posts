import { useContext } from "react"
import { Container, Row } from "react-bootstrap"
import PostCard from "../components/PostCard"
import PostsContext from "../utils/PostsContext"

function Home() {
  const { posts } = useContext(PostsContext)

  return (
    <Container>
      <Row xs={1} sm={2} md={4} className="g-4">
        {posts.map(post => (
          <PostCard post={post} inProfile={false} />
        ))}
      </Row>
    </Container>
  )
}

export default Home

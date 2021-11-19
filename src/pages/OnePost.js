import { useContext } from "react"
import { Card, Col, Container, Image, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import PostsContext from "../utils/PostsContext"

function OnePost() {
  const { postId } = useParams()
  const { posts } = useContext(PostsContext)
  const post = posts.find(p => p._id === postId)

  if (!post) {
    return <h1>Loading...</h1>
  }
  return (
    <Container className="mt-5 mb-3">
      <Row className="d-flex align-items-center justify-content-center">
        <Col md={2}>
          <h3>Owner</h3>
        </Col>
        <Col md={3}>
          <Image src={post._user.photo} style={{ height: 200 }} />
        </Col>
        <Col md={4}>
          <h3>
            {post._user.firstName} {post._user.lastName}
          </h3>
        </Col>
      </Row>
      <Row className="mt-5 d-flex align-items-center">
        <Col>
          <Image src={post.image} style={{ height: 400 }} thumbnail />
        </Col>
        <Col md={7}>
          <Card>
            <Card.Header>
              <Card.Title className="text-center"> {post.title}</Card.Title>
            </Card.Header>
            <Card.Body style={{ height: 200 }}>
              <Card.Text className="text-center">{post.body}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default OnePost

import { useContext } from "react"
import { Col, Container, Row, Image } from "react-bootstrap"
import PostCard from "../components/PostCard"
import PostsContext from "../utils/PostsContext"

function Profile() {
  const { profile, posts } = useContext(PostsContext)

  if (!profile) {
    return <h1>Loading...</h1>
  }

  const myPosts = posts.filter(post => post._user._id === profile._id)

  return (
    <Container>
      <Row className="d-flex align-items-center mb-5">
        <Col>
          <Image src={profile.photo} height="250px" />
        </Col>
        <Col>
          <h2 className="mb-2">
            {profile.firstName} {profile.lastName}
          </h2>
          <p className="text-muted">{profile.email}</p>
        </Col>
      </Row>
      <Row md={4} sm={2} xs={1}>
        {myPosts.map(post => (
          <PostCard post={post} inProfile={true} />
        ))}
      </Row>
    </Container>
  )
}

export default Profile

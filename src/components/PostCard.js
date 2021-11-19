import { useContext, useState } from "react"
import { Card, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import PostsContext from "../utils/PostsContext"
import ModalItem from "./Modal"

function PostCard(props) {
  const { post, inProfile } = props
  const [show, setShow] = useState(false)
  const { deletePost } = useContext(PostsContext)

  const handleClose = () => {
    setShow(false)
  }

  const handleOpen = () => {
    setShow(true)
  }
  return (
    <>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>
              {post._user.firstName} {post._user.lastName}
            </Card.Title>
            <Card.Img variant="top" src={post.image} />
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.body}</Card.Text>
            {inProfile ? (
              <>
                <Button variant="success" className="me-2" onClick={handleOpen}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => deletePost(post._id)}>
                  Delete
                </Button>
              </>
            ) : (
              <Link className="btn btn-primary" to={`/post/${post._id}`}>
                View
              </Link>
            )}
          </Card.Body>
        </Card>
      </Col>
      <ModalItem show={show} handleClose={handleClose} post={post} />
    </>
  )
}

export default PostCard

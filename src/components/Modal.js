import { useContext } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import PostsContext from "../utils/PostsContext"

function ModalItem(props) {
  const { show, handleClose, post } = props
  const { confirmPost } = useContext(PostsContext)

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Post</Modal.Title>
      </Modal.Header>
      <Form onSubmit={e => confirmPost(e, post._id)}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control name="title" type="text" defaultValue={post.title} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label column md="2">
              Body
            </Form.Label>
            <Form.Control as="textarea" name="body" defaultValue={post.body} rows={3} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label column md="2">
              Image
            </Form.Label>
            <Form.Control type="url" name="image" defaultValue={post.image} required />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" type="submit" onClick={handleClose}>
            Confirm
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default ModalItem

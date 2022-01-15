import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container, Form, Button, Modal } from "react-bootstrap"
import "./styles.scss"
import useAuthGuard from "../../../../hooks"

const Edit = () => {

  useAuthGuard()
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [post, setPost] = useState({ 
    title: "",
    text: "" 
  })

  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_GET_URL;
  console.log('i am the url', apiUrl)

  const { id } = useParams()
  console.log("here is the id", id);

  const editBlogPost = async () => {
    try {
      const formDt = new FormData();
      formDt.append("cover", image);

      const response = await fetch(`${apiUrl}/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify(post),
        headers: { "Content-Type": "application/json" },
      });
      console.log("outside the fetch");
      if (response.ok) {
        let data = await response.json();
        console.log(`another console log for the res`, data);

        try {
          const formDt = new FormData();
          formDt.append("cover", image);
          let postImage = await fetch(`${apiUrl}/ ${data.id}/cover`, {
            method: "PUT",
            body: formDt,
          });
          if (postImage.ok) {
            navigate("/home");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("after ther fail of if block inside th else ");
      }
    } catch (error) {
      console.log("failed catch block");
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("use state efect");
  }, []);



  return (
    <Container  className="new-blog-container p-0 mb-0 mt-0">
      <div className="d-flex customLinks" style={{ paddingTop: "-110px" }}>
        <div style={{cursor: "pointer" }}>
          <img alt=''
            className="lrdimg"
            width="17px"
            src="https://img.icons8.com/ios/50/000000/edit--v1.png"
          />
        </div>
        
        <div variant="primary" onClick={handleShow}>
          <div style={{ marginLeft: "15px" }}>
            <span>edit Post</span>
          </div>
        </div>
        

        <Modal className="px-4" style={{height: "500px", overflow: "auto"}}
         show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title >edit blogPost</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              size="lg"
              value={post.title}
              onChange={(e) =>
              setPost({...post, title: e.target.value })}/>
          </Form.Group>
          <Form.Group controlId="blog-content" className="mt-3">
            <Form.Label>Blog Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={post.text}
              onChange={(e) =>
              setPost({ ...post, text: e.target.value })}/>
          </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button className="shareComments " size="sm" variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
                size="sm"
                className="shareComments"
                variant="dark"
                style={{ marginLeft: "1em" }}
                onClick={(e) => editBlogPost(e)}>
                Submit
              </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
};
export default Edit;

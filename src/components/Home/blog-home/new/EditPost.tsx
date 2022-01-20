import { useState, useEffect, createRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container, Form, Button, Modal } from "react-bootstrap"
import "./styles.scss"
import useAuthGuard from "../../../../lib/index"
import { useSelector } from "react-redux"
import { ReduxState } from "../../../../redux/interfaces"

const Edit = () => {

  useAuthGuard()
  
  const [show, setShow] = useState(false);
  const { user } = useSelector((state: ReduxState) => state.data)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [post, setPost] = useState({ 
    title: "",
    text: "" 
  })

  const [image, setImage] = useState<string>('')
  const navigate = useNavigate();

  
  const { id } = useParams()
  
  const target = (e: any) => {
    console.log(e.target.files[0])
    if (e.target && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }
  
  const inputBtn = createRef<HTMLInputElement>()
  
  const openInputFile = () => {
    inputBtn!.current!.click()
  }
 
  const apiUrl = process.env.REACT_APP_GET_URL

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
        
        <div className="primary" onClick={handleShow}>
          <div style={{ marginLeft: "15px" }}>
            <span>edit Post</span>
          </div>
        </div>
        

        <Modal id='postModal' size="lg" className="px-4" style={{height: "500px", overflow: "auto"}}
         show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title >edit blogPost</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="d-flex userInfoContainer">
            <div>
              <img src={user!.image} alt="" 
                  className="roundpic" width={47}/>
            </div>
            <div className="ml-2 userInfo">
                <span>{user!.firstName} {user!.lastName}</span>
            </div>
          </div>
          <Form.Group controlId="blog-content" className="form1 mt-3">
            <Form.Control
              placeholder="wanna change something?"
              as="textarea"
              className="textarea"
              rows={5}
              value={post.text}
              onChange={(e) =>
              setPost({ ...post, text: e.target.value })}
              />
          </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <div >
                <button onClick={openInputFile} className="btn btn-sm btnIcon">
                <input type="file" ref={inputBtn} className="d-none" onChange={(e)=> target(e)} />
                  <img src="https://img.icons8.com/wired/50/000000/picture.png" alt='' height='27px' width='27px'/>
                </button>
                <button onClick={openInputFile} className="btn btn-sm btnIcon ml-2">
                <input type="file" ref={inputBtn} className="d-none" onChange={(e)=> target(e)} />
                  <img src="https://img.icons8.com/dotty/50/000000/attach.png" alt='' height='27px' width='27px'/>
                </button>
              </div>
            <Button
                size="lg"
                className="modal-btn ml-auto"
                variant="dark"
                style={{ fontSize: '15px' }}
                onClick={(e) => editBlogPost()}>
                Update
              </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
};
export default Edit;

import { Row, Col } from "react-bootstrap"
import BlogItem from "../blog-item/BlogItem"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GET_BLOGS } from "../../../redux/actions"
import { ReduxState } from "../../../redux/interfaces"
import Loader from "../loader/Loader"



const BlogList = () => {
  

  const apiUrl = process.env.REACT_APP_GET_URL 
  const navigate = useNavigate()
 
  const posts = useSelector((state: ReduxState) => state.posts)

  const dispatch = useDispatch()

   const getData = async () => {
    try {
      const response = await fetch(`${apiUrl}/posts`)
      if (response.ok) {
        const { posts } = await response.json()
        const newPost = posts.reverse()
        console.log('here is the post', newPost)
        dispatch({
          type: GET_BLOGS,
          payload: newPost
        })
      }
    } catch (error) {
      console.log(error)
    }
  }



  const deleteBlogPost = async(id: string) => {
    try {
      const response = await fetch(`${apiUrl}/${id}` , {
        method: 'DELETE',
      })
        if(response.ok){
          console.log('Deleted')
          getData()
          navigate("/")
        }
    } catch (error) {
      console.log('ooops we encountered an error', error)
    }
  }

 

  useEffect(() => {
    getData()
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return posts ? (
    <Row className='mt-3 justify-content-center'>
      { posts.map((post, i) => (
          <Col key={i} md={10} lg={11} style={{ marginBottom: 50 }}>
            <div>
            <BlogItem key={i} {...post} getData={getData}/>
            </div>
          </Col>
        )) }
    </Row>
  ) : ( <Loader /> )
} 

export default BlogList
import { Row, Col, Button } from "react-bootstrap"
import BlogItem from "../blog-item/BlogItem"
import { useNavigate } from "react-router-dom"
import { useEffect, Dispatch, SetStateAction } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GET_BLOGS } from "../../../redux/actions"
import { ReduxState } from "../../../redux/interfaces"
import Loader from "../loader/Loader"
import Blog from "../views"


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

  // const [reroute, setReRoute] = useState(false)
  // const [id, setId] = useState<string | undefined>('')

 

  useEffect(() => {
    // getData()
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return posts ? (
    <Row id='blogList' className='blogList justify-content-center'>
      <>
      { posts.map((post, i) => (
        <Col key={i} md={12} lg={12} style={{ borderTop: '1px solid rgb(216, 215, 215)',
         padding: '0px'}}>
            <div className="blogList">
                <BlogItem key={i}  {...post} getData={getData}/>
            </div>
          </Col>
        )) }
      </>
    </Row>
  ) : ( <Loader /> )
} 

export default BlogList
import { Row, Col, Spinner } from "react-bootstrap"
import BlogItem from "../blog-item/BlogItem"
import { useNavigate } from "react-router-dom"
import { SetStateAction, useEffect, useState, Dispatch } from "react"
import { useDispatch } from "react-redux"
import { GET_BLOGS } from "../../../redux/actions"
import Loader from "../loader/Loader"
import { ReduxState, Posts } from "../../../redux/interfaces"

interface BlogListProps {
  posts: Posts[]
  getData: () => Promise<void>
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

const BlogList = ({ posts, getData, isLoading, setIsLoading }: BlogListProps) => {
  

  const apiUrl = process.env.REACT_APP_GET_URL 
  const navigate = useNavigate()
 
  // const posts = useSelector((state: ReduxState) => state.posts)
  // const [isLoading, setIsLoading] = useState(true)

  const dispatch = useDispatch()

  //  const getData = async () => {
  //   try {
  //     const response = await fetch(`${apiUrl}/posts`)
  //     if (response.ok) {
  //       const { posts } = await response.json()
  //       const newPost = posts.reverse()
  //       console.log('here is the post', newPost)
  //       dispatch({
  //         type: GET_BLOGS,
  //         payload: newPost
  //       })
  //       setTimeout(() => {
  //         setIsLoading(false)
  //       }, 4000)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
 

  useEffect(() => {
    getData()
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return posts ? (
    <Row id='blogList' className='blogList justify-content-center'>
      {isLoading === true ? <div className='loader'><Spinner animation='border' /> </div>:
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
      }
    </Row>
  ) : ( <Loader /> )
} 

export default BlogList
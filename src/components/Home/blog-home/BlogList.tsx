import { Row, Col, Spinner } from "react-bootstrap"
import BlogItem from "../blog-item/BlogItem"
import { SetStateAction, useEffect, Dispatch } from "react"
import Loader from "../loader/Loader"
import { Posts } from "../../../redux/interfaces"

interface BlogListProps {
  posts: Posts[]
  getData: () => Promise<void>
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

const BlogList = ({ posts, getData, isLoading, setIsLoading }: BlogListProps) => {

  useEffect(() => {
    getData()
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return posts ? (
    <Row id='blogList' className='blogList justify-content-center'>
      {isLoading ? <div className='loader'><Spinner animation='border' /> </div>:
      <>
      { posts.map((post, i) => (
        <Col key={i} md={12} lg={12} style={{ padding: '0px'}}>
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
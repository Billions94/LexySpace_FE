import { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import BlogList from "./BlogList"
import Weather from "./Weather"
import useAuthGuard from "../../../lib/index"
import { useDispatch, useSelector } from "react-redux"
import { getPosts, getUsersAction, GET_BLOGS, hideMeAction, hideTaskAction } from "../../../redux/actions"
import HotPosts from "./HotPosts"
import { ReduxState } from "../../../redux/interfaces"
import Blog from "../views"
import Footer from "../../footer/Footer"
import PostContainer from "./Post"
import TaskList from "./TaskList"
import Search from "./Search"
import { Element } from 'react-scroll'
import MusicPlayer from "../musicplayer/MusicPlayer"
import "./styles.scss"
// import Blog from "../views/Index"


const Home = () => {

  useAuthGuard()

  const beUrl = process.env.REACT_APP_GET_URL
  const dispatch = useDispatch()
  const [value, setValue] = useState<number>()
  const [isLoading, setIsLoading] = useState(true)
  const [fetchLoading, setFetchLoading] = useState(false)
  const { hideMe, reroute, hideTask } = useSelector((state: ReduxState) => state.data)
  const { posts } = useSelector((state: ReduxState) => state)


  const toggleHide = () => {
    hideMe === false ? dispatch(hideMeAction(true)) : dispatch(hideMeAction(false))
  }

  const toggleHideTask = () => {
    hideTask === false ? dispatch(hideTaskAction(true)) : dispatch(hideTaskAction(false))
  }

  const getData = async () => {
    try {
      const response = await fetch(`${beUrl}/posts`)
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


  useEffect(() => {
    if (fetchLoading === false) {
      getData()
      dispatch(getPosts())
    }
    dispatch(getUsersAction())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reroute])

  useEffect(() => {
    window.addEventListener("scroll", (event) => {
      setValue(window.scrollY)
    })

    window.scrollTo({ top: value, behavior: "smooth" })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reroute])


  return posts && (
    <Container id='mainContainer' className="pt-0 ml-auto" fluid="sm">
      <Row className="pt-0 mainContainer justify-content-center">
        <Col className='sidebar d-none d-xs-none d-sm-none d-md-flex' sm={4} md={4} lg={4}>
          <Col style={{ overflow: 'hidden' }}>
            <MusicPlayer />
            <Search />
            <HotPosts />
            <div onClick={() => toggleHide()} className='d-flex'
              style={{ cursor: 'pointer' }} >
              <div className="text-muted sidebarFont">Weather</div>
              <div className="ml-auto">
                {hideMe === false ?
                  <img src="https://img.icons8.com/ios-filled/50/ffffff/invisible.png"
                    width='27px' height='27px' alt='' />
                  :
                  <img src="https://img.icons8.com/ios-filled/50/ffffff/closed-eye.png"
                    width='27px' height='27px' alt='' />
                }
              </div>
            </div>
            {hideMe === false ?
              <Weather /> : null
            }
            <div onClick={() => toggleHideTask()} className="d-flex"
              style={{ cursor: 'pointer' }}>
              <div className="text-muted sidebarFont">NotePad</div>
              <div className="ml-auto">
                {hideTask === false ?
                  <img src="https://img.icons8.com/ios-filled/50/ffffff/invisible.png"
                    width='27px' height='27px' alt='' />
                  :
                  <img src="https://img.icons8.com/ios-filled/50/ffffff/closed-eye.png"
                    width='27px' height='27px' alt='' />
                }
              </div>
            </div>
            {hideTask === false ?
              <TaskList /> : null
            }
            <div className='sticky-top mt-5'>
              <Footer />
            </div>
          </Col>
        </Col>
        <Col className="feed" sm={12} md={7} lg={7}>
          {reroute === false ?
            <Col className='mainfeed justify-content-center' md={11} lg={12}>
              <PostContainer
                fetchLoading={fetchLoading}
                setFetchLoading={setFetchLoading}
              />
              <BlogList
                posts={posts}
                getData={getData}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </Col> :
            <Col md={11} lg={12}>
              <Element name='postSectionInner'>
                <Blog />
              </Element>
            </Col>
          }
        </Col>
        <Col lg={1}></Col>
      </Row>
    </Container>
  )

}

export default Home

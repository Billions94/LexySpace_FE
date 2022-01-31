import { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import BlogList from "./BlogList"
import Weather from "./Weather"
import useAuthGuard from "../../../lib/index"
import { useDispatch, useSelector } from "react-redux"
import { getPosts, getUsersAction, hideMeAction, hideTaskAction } from "../../../redux/actions"
import HotPosts from "./HotPosts"
import Loader from "../loader/Loader"
import { ReduxState } from "../../../redux/interfaces"
import "./styles.scss"
import Blog from "../views"
import Footer from "../../footer/Footer"
import PostContainer from "./Post"
import TaskList from "./TaskList"
import Search from "./Search"
import { Element, scroller } from 'react-scroll'
// import Blog from "../views/Index"


const Home = () => {

  useAuthGuard()

  const dispatch = useDispatch()
  const { hideMe, reroute, isLoading, hideTask } = useSelector((state: ReduxState) => state.data)
  const { posts } = useSelector((state: ReduxState) => state)
  // console.log('user', user)
  // const [reroute, setReRoute] = useState(false)


  const toggleHide = () => {
    hideMe === false ? dispatch(hideMeAction(true)) : dispatch(hideMeAction(false))
  }

  const toggleHideTask = () => {
    hideTask === false ? dispatch(hideTaskAction(true)) : dispatch(hideTaskAction(false))
  }



  useEffect(() => {
    dispatch(getUsersAction())
    scroller.scrollTo('postSectionInner', {
      // duration: 1000,
      // delay: 100,
      smooth: true,
      offset: -150,
  })
    // dispatch(getPosts())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reroute])

  return posts ? (
    <Container id='mainContainer' className="pt-0 ml-auto" fluid="sm">
      <Row className="pt-0 mainContainer justify-content-center">
        <Col className='sidebar d-none d-xs-none d-sm-none d-md-flex'sm={4} md={4} lg={4}>
          <Col>
            <Search />
            <HotPosts />
            <div onClick={() => toggleHide()}
              style={{ cursor: 'pointer' }}>
              { hideMe === false  ?
                  <img src="https://img.icons8.com/ios-filled/50/000000/visible--v1.png"
                  width='27px' height='27px' />
                  :
                  <img src="https://img.icons8.com/ios-filled/50/000000/hide.png"
                    width='27px' height='27px' />
              }
            </div>
            { hideMe === false ?
              <Weather /> : null
            }
            <div onClick={() => toggleHideTask()}
              style={{ cursor: 'pointer' }}>
              { hideTask === false  ?
                  <img src="https://img.icons8.com/ios-filled/50/000000/visible--v1.png"
                  width='27px' height='27px' />
                  :
                  <img src="https://img.icons8.com/ios-filled/50/000000/hide.png"
                    width='27px' height='27px' />
              }
            </div>
            { hideTask === false ?
              <TaskList /> : null
            }
            <div className='sticky-top mt-5'>
              <Footer />
            </div>
          </Col>
        </Col>
        <Col className="feed" sm={12} md={7} lg={7}>
          {reroute === false ?
            <Col className=' justify-content-center' md={11} lg={12}>
              <PostContainer />
              <BlogList posts={posts}/>
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
  ) : <Loader />

}

export default Home

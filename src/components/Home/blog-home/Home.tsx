import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BlogList from "./BlogList";
import Weather from "./Weather";
import useAuthGuard from "../../../lib/index"
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getUsersAction } from "../../../redux/actions";
import HotPosts from "./HotPosts";
import Loader from "../loader/Loader";
import { ReduxState } from "../../../redux/interfaces";
import "./styles.scss";
import Blog from "../views";
import Footer from "../../footer/Footer";
import PostContainer from "./Post";
// import Blog from "../views/Index";


const Home = () => {

  useAuthGuard()

  const dispatch = useDispatch();
  const posts = useSelector((state: ReduxState) => state.posts)
  const { user } = useSelector((state: ReduxState) => state.data)
  console.log('user', user)
  const [reroute, setReRoute] = useState(false)
  const [hideMe, setHideMe] = useState(false)

  const toggleHide = () => {
    hideMe === false ? setHideMe(true) : setHideMe(false)
  }
 


  useEffect(() => {
    dispatch(getUsersAction())
    dispatch(getPosts())
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
    return posts ? (
      <Container id='mainContainer' className="pt-0 ml-auto" fluid="sm">
        <Row  className="pt-0 mainContainer">
          <Col className='sidebar' md={4} lg={4}>
            <Col>
            <HotPosts  setReRoute={setReRoute}/>
            <div onClick={() => toggleHide()}
              style={{cursor: 'pointer'}}>
                { hideMe === false ? 
                  <img src="https://img.icons8.com/ios-filled/50/000000/hide.png"
                    width='27px' height='27px'/>
                    : 
                  <img src="https://img.icons8.com/ios-filled/50/000000/visible--v1.png"
                    width='27px' height='27px'/>
                }
            </div>
            { hideMe === false ?
            <Weather /> : null
            }
            <div className='sticky-top'>
            <Footer />
            </div>
          </Col>
          </Col>
          <Col className="feed" sm={6} md={8} lg={7}>
            { reroute === false ?
            <Col  md={11} lg={12}>
              <PostContainer />
              <BlogList setReRoute={setReRoute}/> 
            </Col> : 
            <Col  md={11} lg={12}>
              <Blog setReRoute={setReRoute}/>
            </Col>
            }
        </Col>
        </Row>
      </Container>
    ) : ( <Loader /> )
  
}

export default Home

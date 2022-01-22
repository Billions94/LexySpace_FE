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
// import Blog from "../views/Index";


const Home = () => {

  useAuthGuard()

  const dispatch = useDispatch();
  const posts = useSelector((state: ReduxState) => state.posts)
  const { user } = useSelector((state: ReduxState) => state.data)
  console.log('user', user)
  const [reroute, setReRoute] = useState(false)
 


  useEffect(() => {
    dispatch(getUsersAction())
    dispatch(getPosts())
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
    return posts ? (
      <Container id='mainContainer' className="pt-3" fluid="sm">
        <Row>
          <Col className='sidebar' md={4} lg={4}>
            <HotPosts  setReRoute={setReRoute}/>
            <Weather />
          </Col>
          <Col sm={6} md={8} lg={8}>
            { reroute === false ?
            <Col md={11} lg={10}>
              <BlogList setReRoute={setReRoute}/> 
            </Col> : 
            <Col md={11} lg={12}>
              <Blog setReRoute={setReRoute}/>
            </Col>
            }
        </Col>
        </Row>
      </Container>
    ) : ( <Loader /> )
  
}

export default Home

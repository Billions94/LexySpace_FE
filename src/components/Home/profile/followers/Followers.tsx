import { useState, useEffect } from "react"
import { Col, Container, ListGroup, Row } from "react-bootstrap"
import { Avatar } from "@mui/material"
import '../styles.scss'
import { useSelector } from "react-redux"
import FollowButton from "./FollowButton"
import Loader from "../../loader/Loader"
import { useNavigate, useParams, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getFollowersAction } from "../../../../redux/actions"
import { ReduxState } from "../../../../redux/interfaces"
import FollowersList from "./FollowersList"

const Followers = () => {

    const { followers } = useSelector((state: ReduxState) => state.data)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()



  useEffect(()=> {
    dispatch(getFollowersAction(id))
  }, [])


   return followers.length > 0 ? (
    <Container>
      <Row className='justify-content-center mt-5'>
        <Col xs={12} sm={12} md={6} lg={8}>
          <ListGroup id='listGroup'>
              {
                followers.map(f => (
                  <FollowersList f={f}/>
                ))
              }
          </ListGroup>
        </Col>
      </Row>
    </Container>
  ) : ( <Loader /> )
}

export default Followers

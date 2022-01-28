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
import { ReduxState, User } from "../../../../redux/interfaces"
import FollowersList from "./FollowersList"

const Followers = () => {

    const beUrl = process.env.REACT_APP_GET_URL
    const { followers } = useSelector((state: ReduxState) => state.data)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const [user, setUser] = useState<User | null>(null)

    const getUser = async () => {
      try {
        const token = localStorage.getItem('accessToken')
        const response = await fetch(`${beUrl}/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if(response.ok) {
          const data = await response.json()
          console.log('here is the data', data)
          setUser(data)
        } else {
          throw new Error('error fetching users')
        }
      } catch (error) {
        console.log(error)
      }
    }


  useEffect(()=> {
    dispatch(getFollowersAction(id))
    getUser()
  }, [])


   return followers.length > 0 ? (
    <Container>
      <Row className='justify-content-center mt-5'>
        <Col xs={12} sm={12} md={9} lg={8}>
          {user && 
            <>
            {user.followers.length > 1 ?
            <h6 className='text-center mb-3'>{user.firstName} {user.lastName}'s followers</h6>
            :
            <h6 className='text-center mb-3'>{user.firstName} {user.lastName}'s follower</h6>
            }
            </>
          }
          <ListGroup id='listGroup'>
              {
                followers.map(f => (
                  <ListGroup.Item>
                    <FollowersList f={f}/>
                  </ListGroup.Item>
                ))
              }
          </ListGroup>
        </Col>
      </Row>
    </Container>
  ) : ( <Loader /> )
}

export default Followers

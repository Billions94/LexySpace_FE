import { useState, useEffect } from "react"
import { Button, Row, Col, Spinner } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import useAuthGuard from "../../../lib/index"
import EditProfile from "./EditProfile"
import UpdateImage from "./UpdateImage"
import { useDispatch, useSelector } from "react-redux"
import { getFollowersAction, getPosts } from "../../../redux/actions"
import { getUsersAction } from "../../../redux/actions"
import { ReduxState, User } from "../../../redux/interfaces"

import "./styles.scss"
import Recentposts from "./recentPost/RecentPosts"

const UserProfile = () => {

  useAuthGuard()

  const beUrl = process.env.REACT_APP_GET_URL

  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const posts = useSelector((state: ReduxState) => state.posts)
  const stateUser = useSelector((state: ReduxState) => state.data.user)
  const me = stateUser?._id

  const follower = { followerId: me }
  
  const [show, setShow] = useState(false)
  const [pic, setPic] = useState(false)
  const [loading, setLoading] = useState(true)
  const [following, setFollowing] = useState(false)
  const [user, setUser] = useState<User | null>(null)


  const handleShow = () => setShow(true)
  const handlePic = () => setPic(true)

  const token = localStorage.getItem('accessToken')

  const follow = async () => {
    try {
      const response = await fetch(`${beUrl}/users/${id}/follow`, {
        method: 'POST',
        body: JSON.stringify(follower),
        headers: { 'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` }
      })
      if(response.ok) {
        const data = await response.json()
        getUser()
        console.log('Now following user', data)
      } else {
        throw new Error('Something went wrong :(')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getUser = async () => {
    try {
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
    dispatch(getPosts())
    dispatch(getUsersAction())
    getUser()
  }, [])

  const toggle = (id: string | undefined) => {
    following === false ? nowFollow(id) : unfollow(id)
}

const nowFollow = (id: string | undefined) => {
  console.log('user already', )
  follow()
  setFollowing(true)

}
const unfollow = (id: string | undefined) => {
  console.log('user already', )
    follow()
    setFollowing(false)
}



  return user ? (
    <>
      <Row id='userProfileContainer' className="justify-content-center">
        <Col id="jumbotron-banner1"   className="userJumbo magicRow mb-3" sm={6} md={7} lg={7}>
          <div  className="rounded-lg bg-white p-0">
         
            <Row className="magicRow p-2" style={{ marginTop: "250px" }}>
              <div id="jinx" className="d-flex col-md-8">

                <div className="imgDiv">
                  <img id="profile-pic" onClick={handlePic} 
                    src={user.image}
                    alt="ProfilePicture" width="130" height="130"/>
                </div>
                { id !== me ? null 
                :
                <UpdateImage show={pic} setShow={setPic}/>
                }
                <div>
                <div className="nameHeader ml5">{user.firstName} {user.lastName}</div>
                <div className="ml5">lives in {user.location}</div>
                <div className="ml5">{user.bio}</div>
                {
                  user!.followers!.length > 1 ? <span className="ml5 customLinks1"
                  onClick={()=> navigate(`/followers/${user?._id}`)}>{user?.followers?.length} followers</span> : null
                }
                {
                  user!.followers!.length === 1 ? <span className="ml5 customLinks1"
                  onClick={()=> navigate(`/followers/${user?._id}`)}>{user?.followers?.length} follower</span> : null 
                }
                {
                  user!.followers!.length === 0 ? <span className="ml5 customLinks1">{user?.followers?.length} follower</span> : null 
                }
                </div>
              </div>
              <Col md={4} className="text-left justify-content-center">
              <br />
                <div className="d-flex mb-3">
                  { user?.isVerified === true &&
                    <div className=" mt-1  d-flex-row align-items-center">
                    <img alt='' className="mr-2" width="25"
                      src="https://img.icons8.com/dotty/50/000000/guarantee.png"/>
                      <b>verified</b>
                    </div>
                  }
                </div>
                  { id !== me ? null 
                    :  
                    <Button onClick={handleShow} variant="white" className="jumbobtn">
                      edit Profile
                    </Button>
                  }
                  {
                    id !== me &&
                    <p>
                  { following === false ? 
                    <Button onClick={() => toggle(id)} variant="primary" className="followbtn mt-2">
                      follow
                    </Button>
                    : 
                    <Button onClick={() => toggle(id)} variant="primary" 
                        className="nowfollowing mt-2">
                        following
                    </Button>
                  }
                    </p>
                  }
             
                <EditProfile show={show} setShow={setShow}/>
              </Col>
            </Row>
          </div>
        </Col>
            <Col xs={12} sm={10} md={6} lg={8}>
              <Recentposts id={id} posts={posts}/>
            </Col>
      </Row>
    </>
  ) : ( <div className="text-center mt-3">
  { loading === true &&
      <Spinner animation="grow" />
  }
</div> )
}

export default UserProfile

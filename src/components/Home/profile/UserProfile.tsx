import { useState, useEffect } from "react"
import { Button, Row, Col, Image } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import useAuthGuard from "../../../lib/index"
import EditProfile from "./EditProfile"
import UpdateImage from "./UpdateImage"
import { useDispatch, useSelector } from "react-redux"
import { followAction, getFollowersAction, getPosts } from "../../../redux/actions"
import { defaultCover, defaultAvatar } from "../../../redux/store"
import { ReduxState, User } from "../../../redux/interfaces"
import Recentposts from "./recentPost/RecentPosts"
import Cover from "./Cover"
import Loader from "../loader/Loader"
import "./styles.scss"


const UserProfile = () => {

  useAuthGuard()

  const beUrl = process.env.REACT_APP_GET_URL

  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const posts = useSelector((state: ReduxState) => state.posts)
  const stateUser = useSelector((state: ReduxState) => state.data.user)
  const { following, cover, followers } = useSelector((state: ReduxState) => state.data)
  const me = stateUser?._id

  const follower = { followerId: me }
  
  const [show, setShow] = useState(false)
  const [pic, setPic] = useState(false)
  const [loading, setLoading] = useState(true)
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
        dispatch(getFollowersAction(id))
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



  
  const toggle = (id: string | undefined) => {
    following === false ? nowFollow(id) : unfollow(id)
  }
  
  const nowFollow = (id: string | undefined) => {
    follow()
    dispatch(followAction(true))
    
  }
  const unfollow = (id: string | undefined) => {
    follow()
    dispatch(followAction(false))
    setLoading(true)
  }
  
  useEffect(()=> {
    dispatch(getPosts())
    dispatch(getFollowersAction(id))
    getUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return user ? (
    <>
      <Row id='userProfileContainer' className="justify-content-center">
        <Col className="userJumbo magicRow jumbotron-banner1 p-0 pb-3" sm={12} md={10} lg={7}>
            <Row className="magicRow d-flex p-0">
              <Col sm={6} md={7} lg={7} className="coverDiv">
                { id !== me ?
                <>
                { user?.cover === undefined || null ? <img className='cover mb-2' src={defaultCover} alt='new Cover' height='250px'/> : 
                  <img className='cover mb-2' src={user.cover} alt='' height='250px'/> 
                }
                </> 
                  : 
                  <img className='cover mb-2' src={cover} alt='' height='250px'/>
                }
              </Col> 
      
              <div className="coverModal">
                { id !== me ? null :
                  <Cover getUser={getUser} />
                }
              </div>

              <div id="jinx"  className="d-flex px-4 col-lg-10">

                <div className="imgDiv ml5">
                  { <Image roundedCircle id="profile-pic" onClick={handlePic} 
                    src={user.image ? user.image : defaultAvatar}
                    alt="ProfilePicture" width="130" height="130"/>
                  }
                    
                <div>
                <div className="nameHeader ">{user.firstName} {user.lastName}</div>
                <div className="">lives in {user.location}</div>
                <div className="">{user.bio}</div>
                {
                  user!.followers!.length > 1 ? <span className=" customLinks1"
                  onClick={()=> navigate(`/followers/${user?._id}`)}>{user?.followers?.length} followers</span> : null
                }
                {
                  user!.followers!.length === 1 ? <span className=" customLinks1"
                  onClick={()=> navigate(`/followers/${user?._id}`)}>{user?.followers?.length} follower</span> : null 
                }
                {
                  user!.followers!.length === 0 ? <span className=" customLinks1">{user?.followers?.length} follower</span> : null 
                }
                </div>
                </div>

                <UpdateImage xUser={user} show={pic} setShow={setPic} getUser={getUser}/>
              
              <div className="text-left ml-auto justify-content-center">
              <br />
                <div className="d-flex justify-content-center mb-3">
                  { user?.isVerified === true &&
                    <div className=" mt-1  d-flex-row align-items-center">
                    <img alt='' className="mr-2" width="22px"
                       src="https://img.icons8.com/ios-filled/50/4a90e2/verified-account.png"/>
                      {/* <b>verified</b> */}
                    </div>
                  }
                </div>
                <Col md={12} lg={12}>
                  { id !== me ? null 
                    :  
                    <Button onClick={handleShow} variant="white" className="nowfollowing text-white">
                      edit Profile
                    </Button>
                  }
                  {
                    id !== me &&
                    <p>
                  { !followers.some(elem => elem._id === me) ? 
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
                  <EditProfile show={show} setShow={setShow} getUser={getUser}/>
                </Col>
              </div>
              </div>
            </Row>
            <Col className='recentDiv'>
            <Recentposts id={id}  posts={posts}/>
            </Col>
        </Col>
      </Row>
      {/* <Col lg={12} className="justify-content-center">
      <Footer />
      </Col> */}
    </>
  ) : ( <div className="text-center">
    { loading === true &&
      <Loader />
    }
    </div> )
}

export default UserProfile

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "react-bootstrap"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { User } from "../../../redux/interfaces";
import { ReduxState } from "../../../redux/interfaces"

interface UserInfoProps {
  show: boolean
  props: User 
  handleShow: ()=> void
  setTimer: Dispatch<SetStateAction<boolean>>
  handleClose: ()=> void
}

const UserInfo = ({ show, handleShow, handleClose, setTimer, props }: UserInfoProps) => {

  const beUrl = process.env.REACT_APP_GET_URL

  const { user } = useSelector((state: ReduxState) => state.data)
  const me = user!._id

  const { image, firstName, lastName, userName, followers, _id, bio } = props
  const follower = { followerId: me }
  const [following, setFollowing] = useState(false)

  const navigate = useNavigate()
  
  const follow = async (userId: string | undefined) => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(`${beUrl}/users/${userId}/follow`, {
        method: 'POST',
        body: JSON.stringify(follower),
        headers: { 'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` }
      })
      if(response.ok) {
        const data = await response.json();
        console.log('Now following user', data)
      } else {
        throw new Error('Something went wrong :(')
      }
    } catch (error) {
      console.log(error)
    }
  }


const toggle = (userId: string | undefined) => {
  following === false ? nowFollow(userId) : unfollow(userId)
}

const nowFollow = (userId: string | undefined) => {
  follow(userId)
  setFollowing(true)
}
const unfollow = (userId: string | undefined) => {
  follow(userId)
  setFollowing(false)

}
  

  return (
    <>
    { show === true &&   
    <div id="userInfo" 
      onMouseEnter={()=> {handleShow()}}
      onMouseLeave={() => {handleClose(); setTimer(true)}}>
      <div className="p-2 userInfoContainer">
        <div className="d-flex">
          <div id='userDetails' onClick={()=> navigate(`/userProfile/${_id}`)}
              style={{cursor: 'pointer'}}>
            <img src={image} alt="" className="roundpic" width={47} height={47} />
            <div className="">
              <h5 className="userDetails mb-0">
                {firstName} {lastName}
              </h5>
              <span className="userUserName text-muted">@{userName}</span>
            </div>
          </div>
          {
            _id !== me &&
            <div>
            { following === false ?
              <Button onClick={()=> toggle(_id)}
                size="sm" variant="primary" 
                className="followbtn ml-auto">
                follow
              </Button>
              : 
              <Button onClick={()=> toggle(_id)}
              size="sm" variant="primary" 
              className="nowfollowing ml-auto">
              following
            </Button>
            }
          </div>
          }
        </div>
        <div>
          {bio}
        </div>
        <div className="followers1">
          {followers!.length > 1 ? (
            <span className="ml5 customLinks1"
              onClick={() => navigate(`/followers/${_id}`)}>
              {followers?.length} followers
            </span>
          ) : null}
          {followers!.length <= 1 ? (
            <span className="ml5 customLinks1"
              onClick={() => navigate(`/followers/${_id}`)}>
              {followers?.length} follower
            </span>
          ) : null}
        </div>
      </div>
    </div>
      }
    </>
  );
};

export default UserInfo;

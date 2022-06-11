import { Avatar } from "@mui/material"
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";
import { useSelector } from "react-redux";
import { useEffect, Dispatch, SetStateAction } from "react";
import { User, ReduxState } from "../../../../redux/interfaces";

interface FollowersListProps {
  f: User
  id: string | undefined
  getUser: () => Promise<void>
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
}

const FollowersList = ({ f, id, getUser, refresh, setRefresh }: FollowersListProps) => {

  const beUrl = process.env.REACT_APP_GET_URL
  const { user, followers, following } = useSelector((state: ReduxState) => state.data)
  const me = user!._id

  console.log(me)

  // const [following, setFollowing] = useState(false)
  const follower = { followerId: user?._id }

  const follow = async (userId: string) => {
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
          refresh === false ? setRefresh(true) : setRefresh(false)
        } else {
          throw new Error('Something went wrong :(')
        }
      } catch (error) {
        console.log(error)
      }
    }


  const toggle = (userId: string) => {
    !f.followers  ? nowFollow(userId) : unfollow(userId)
  }

  const nowFollow = (userId: string) => {
    follow(userId)
    // setFollowing(true)
  }
  const unfollow = (userId: string) => {
    follow(userId)
    // setFollowing(false)
 
  }

  useEffect(() => {
    // if(followers.map(flw => flw._id).indexOf(f._id) !== -1){
    //     dispatch(followAction(true))
    // }else dispatch(followAction(false))
  }, [followers])

  return (
    <>
      <div key={f._id} className="d-flex mb-2">
        <Link
          to={`/userProfile/${f._id}`}
          className="d-flex followersContainer customLinks1">
          <div className="">
            <Avatar
              className="d-block avatar"
              alt=""
              src={f.image}
              sx={{ width: 58, height: 58 }}
            />
          </div>
          <div className="ml-2">
            <div className="nameInfo">
              {f.firstName} {f.lastName}
            </div>
            <span className="bio text-muted">
              {f.bio}
            </span>
          </div>
        </Link>
        
        { f._id !== me ? 
        <FollowButton
          followers={followers}
          following={following}
          toggle={toggle}
          // setFollowing={setFollowing}
          f={f}/>
        : null }
  
      </div>
    </>
  );
};

export default FollowersList

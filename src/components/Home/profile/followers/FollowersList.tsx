import { ListGroup } from "react-bootstrap"
import { Avatar } from "@mui/material"
import { useNavigate, Link } from "react-router-dom";
import FollowButton from "./FollowButton";
import { useSelector } from "react-redux";
import { useState } from "react";
import { User, ReduxState } from "../../../../redux/interfaces";

interface FollowersListProps {
  f: User
}

const FollowersList = ({ f }: FollowersListProps) => {

  const navigate = useNavigate()

  const beUrl = process.env.REACT_APP_GET_URL

  const { user, followers } = useSelector((state: ReduxState) => state.data)

  const [following, setFollowing] = useState(false)
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
        } else {
          throw new Error('Something went wrong :(')
        }
      } catch (error) {
        console.log(error)
      }
    }


  const toggle = (userId: string) => {
    following === false ? nowFollow(userId) : unfollow(userId)
  }

  const nowFollow = (userId: string) => {
    follow(userId)
    setFollowing(true)
  }
  const unfollow = (userId: string) => {
    follow(userId)
    setFollowing(false)
 
  }

  return (
    <ListGroup>
      <ListGroup.Item className="d-flex mb-2">
        <Link
          to={`/userProfile/${f._id}`}
          className="d-flex followersContainer customLinks1">
          <div className="">
            <Avatar
              className="d-block avatar"
              alt=""
              src={f.image}
              sx={{ width: 34, height: 34 }}
            />
          </div>
          <div className="ml-2 text-black">
            {f.firstName} {f.lastName}
          </div>
        </Link>
        <FollowButton
          followers={followers}
          following={following}
          toggle={toggle}
          setFollowing={setFollowing}
          f={f}/>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default FollowersList

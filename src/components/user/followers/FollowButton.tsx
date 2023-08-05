import { Button } from "react-bootstrap"
import { User, ReduxState } from "../../../redux/interfaces"
import { useSelector } from "react-redux"
import React from "react"

interface FollowButtonProps {
  followers: User[]
  following: boolean
  // setFollowing: Dispatch<SetStateAction<boolean>>
  toggle: (userId: string) => void
  follower: User
}

const FollowButton = ({ toggle, follower }: FollowButtonProps) => {

  const { user } = useSelector((state: ReduxState['data']) => state)
  const me = user?.id

  return (
    <div className="ml-auto">
      {!follower.followers.some(elem => elem.id === me) ?
        <Button onClick={() => toggle(follower.id)} variant="primary" className="followbtn mt-2">
          follow
        </Button>
        :
        <Button onClick={() => toggle(follower.id)} variant="primary"
                className="nowfollowing mt-2">
          following
        </Button>
      }
    </div>
  )
}

export default FollowButton
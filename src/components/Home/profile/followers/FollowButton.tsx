import { Button } from "react-bootstrap"
import { useEffect, Dispatch, SetStateAction } from "react"
import { User } from "../../../../redux/interfaces"
import { useDispatch } from "react-redux"
import { followAction } from "../../../../redux/actions"

interface FollowButtonProps {
  followers: User[]
  following: boolean
  // setFollowing: Dispatch<SetStateAction<boolean>>
  toggle: (userId: string)=> void
  f: User
}

const FollowButton = ({ following, toggle, f }: FollowButtonProps) => {
  
    return(
        <div className="ml-auto">
        { following === false ? 
            <Button onClick={() => toggle(f._id)} variant="primary" className="followbtn mt-2">
              follow
            </Button>
          : 
            <Button onClick={() => toggle(f._id)} variant="primary" 
                className="nowfollowing mt-2">
                following
            </Button>
        }
    </div>
    )
}

export default FollowButton
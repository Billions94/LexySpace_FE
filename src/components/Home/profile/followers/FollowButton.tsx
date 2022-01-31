import { Button } from "react-bootstrap"
import { User, ReduxState } from "../../../../redux/interfaces"
import { useSelector } from "react-redux"

interface FollowButtonProps {
  followers: User[]
  following: boolean
  // setFollowing: Dispatch<SetStateAction<boolean>>
  toggle: (userId: string)=> void
  f: User
}

const FollowButton = ({ toggle, f }: FollowButtonProps) => {

  const { user } = useSelector((state: ReduxState['data']) => state)
  const me = user?._id
  
    return(
        <div className="ml-auto">
        { !f.followers.some(elem => elem._id === me) ?
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
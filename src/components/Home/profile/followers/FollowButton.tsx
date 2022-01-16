import { Button } from "react-bootstrap"
import { useEffect, Dispatch, SetStateAction } from "react"
import { User } from "../../../../redux/interfaces"

interface FollowButtonProps {
  followers: User[]
  following: boolean
  setFollowing: Dispatch<SetStateAction<boolean>>
  toggle: (userId: string)=> void
  f: User
}

const FollowButton = ({ followers, following, setFollowing, toggle, f }: FollowButtonProps) => {
  

  useEffect(() => {
    if(followers.map(flw => flw._id).indexOf(f._id) !== -1){
        setFollowing(false)
    }else(setFollowing(true))
  }, [])

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
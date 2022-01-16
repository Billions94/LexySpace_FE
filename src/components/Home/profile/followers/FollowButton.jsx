import { Button } from "react-bootstrap"
import { useEffect } from "react"

const FollowButton = ({ followers, following, setFollowing, toggle, f }) => {
  

  useEffect(() => {
    if(followers.map(flw => flw._id).indexOf(f.id) !== -1){
        setFollowing(true)
    }else(setFollowing(false))
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
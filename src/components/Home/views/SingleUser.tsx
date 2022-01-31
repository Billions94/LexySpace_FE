import { Button } from "react-bootstrap"
import { User } from "../../../redux/interfaces"

interface SingleUserProps {
    toggle: (userId: string | undefined) => void
    following: boolean
    user: User
    me: string
}

export const SingleUser = ({ toggle, following, user, me }: SingleUserProps) => {
    return (
        <div>
            {
                user?._id !== me ?
                    <div className='ml-auto'>
                        {following === false ?
                            <Button onClick={() => toggle(user?._id)}
                                size="sm" variant="primary"
                                className="followbtn ml-auto">
                                follow
                            </Button>
                            :
                            <Button onClick={() => toggle(user?._id)}
                                size="sm" variant="primary"
                                className="nowfollowing ml-auto">
                                following
                            </Button>
                        }
                    </div> : null
            }
        </div>
    )
}
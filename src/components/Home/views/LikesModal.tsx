import { Button, Modal } from "react-bootstrap"
import { Dispatch, SetStateAction } from "react"
import { Posts, ReduxState } from "../../../redux/interfaces"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { followAction } from "../../../redux/actions"



interface LikesModalProps {
    likeShow: boolean
    setLikeShow: Dispatch<SetStateAction<boolean>>
    post: Posts
}

const LikesModal = ({ likeShow, setLikeShow, post }: LikesModalProps) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const beUrl = process.env.REACT_APP_GET_URL
    const { following } = useSelector((state: ReduxState['data']) => state)
    const newUser = useSelector((state: ReduxState) => state.data.user)
    const me = newUser?._id
    const follower = { followerId: newUser?._id }

    const likedBy = post.likes.find(liker => liker._id !== me)

    

    const follow = async (userId: string | undefined) => {
        try {
            const token = localStorage.getItem('accessToken')
            const response = await fetch(`${beUrl}/users/${userId}/follow`, {
                method: 'POST',
                body: JSON.stringify(follower),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json()
                // dispatch(getFollowersAction(userId))
                // dispatch(getPosts())
                console.log('Now following user?', data)
            } else {
                throw new Error('Something went wrong :(')
            }
        } catch (error) {
            console.log(error)
        }
    }

    console.log('liker', likedBy)

    const toggle = (userId: string | undefined) => {
        following === false ? nowFollow(userId) : unfollow(userId)
    }

    const nowFollow = (userId: string | undefined) => {
        follow(userId)
        dispatch(followAction(true))
    }
    const unfollow = (userId: string | undefined) => {
        follow(userId)
        dispatch(followAction(false))
    }


    return (
        <div>
            <Modal id='likesModal'
                style={{ borderRadius: '20px' }}
                show={likeShow}
                centered
                onHide={() => setLikeShow(false)}
                aria-labelledby="example-modal-sizes-title-sm">
                <Modal.Header closeButton>
                    <div>
                        Liked by
                    </div>
                </Modal.Header>
                <Modal.Body>
                    {post?.likes.map((user, i) => (
                        <div key={i} id='searchContainer' className="d-flex mt-2">
                            <div onClick={() => navigate(`/userProfile/${user?._id}`)}
                                className='linkToProfile'>
                                <img className='profile-pic' src={user?.image} alt='' />
                                <div className="ml-2">
                                    <h6 className='firstandlastname'>
                                        {user?.firstName} {user?.lastName}
                                        {user?.isVerified === true &&
                                            <span className=" ml-1">
                                                <img alt='' className="mr-2" width="15"
                                                    src="https://img.icons8.com/ios-filled/50/4a90e2/verified-account.png" />
                                            </span>
                                        }
                                    </h6>
                                    <h6 className='text-muted username'>@{user?.userName}</h6>
                                    <h6 className='bio'>{user?.bio}</h6>
                                </div>
                            </div>
                            <div className="ml-auto">
                                {
                                    user?._id !== me ?
                                        <div className='ml-auto'>
                                            { likedBy!.followers && !likedBy!.followers.some(elem => elem._id === me) ?
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
                                {/* <SingleUser toggle={toggle} following={following} user={user} me={me} /> */}
                            </div>
                        </div>
                    ))}
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default LikesModal

// interface SingleUserProps {
//     toggle: (userId: string | undefined) => void
//     following: boolean
//     user: User
//     me: string
// }


// const SingleUser = ({ toggle, following, user, me }: SingleUserProps) => {
//     return (
//         <div>
//             {
//                 user?._id === me ?  null : 
//                     <div className='ml-auto'>
//                         {following === false ?
//                             <Button onClick={() => toggle(user?._id)}
//                                 size="sm" variant="primary"
//                                 className="followbtn ml-auto">
//                                 follow
//                             </Button>
//                             :
//                             <Button onClick={() => toggle(user?._id)}
//                                 size="sm" variant="primary"
//                                 className="nowfollowing ml-auto">
//                                 following
//                             </Button>
//                         }
//                     </div> 
//             }
//         </div>
//     )
// }
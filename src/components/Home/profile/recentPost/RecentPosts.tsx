import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { ReduxState, Posts } from "../../../../redux/interfaces"
import RecentItem from "./RecentItem"

interface RecentPostsProps {
    id: string | undefined
    posts: Posts[]
}

const Recentposts = ({ id, posts }: RecentPostsProps) => {

    const [showRecent, setShowRecent] = useState(true)
    function toggle() {
        showRecent === false ? setShowRecent(true) : setShowRecent(false)
    }
    console.log('i am the id', id)
    useEffect(() => {

    }, [])

    return(
        <div id="recentPost">
                <h5 onClick={() => toggle()}
                className='text-center'>#recent activities</h5>
            <div className="recentDiv">
            { showRecent === false ? null :
                <>
                {
                    posts.map(post => (
                        <>
                        {
                            id === post.user._id ?
                            <RecentItem post={post}/>
                            : null
                        }
                        </>
                    ))
                }
                </>
            }
            </div>
        </div>
    )
}

export default Recentposts
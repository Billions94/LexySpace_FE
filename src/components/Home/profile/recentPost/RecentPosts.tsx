import { useState } from "react"
import { useSelector } from "react-redux"
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

    return(
        <div id="recentPost">
                <h5 onClick={() => toggle()}
                className='text-center'>#recent posts</h5>
            <div className="">
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
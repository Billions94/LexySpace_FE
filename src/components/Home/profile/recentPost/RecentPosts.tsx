import { useSelector } from "react-redux"
import { ReduxState, Posts } from "../../../../redux/interfaces"
import RecentItem from "./RecentItem"

interface RecentPostsProps {
    id: string | undefined
    posts: Posts[]
}

const Recentposts = ({ id, posts }: RecentPostsProps) => {
    

    return(
        <div id="recentPost">
                <h5>#recent posts</h5>
            <div className="d-flex">
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
            </div>
        </div>
    )
}

export default Recentposts
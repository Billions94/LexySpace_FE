import { useSelector } from "react-redux"
import { ReduxState, Posts } from "../../../../redux/interfaces"

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
                    <div className="postContainer">
                        <img src={post.cover} alt='' width={45} height={45}/>
                        <div>
                            {post.text}
                        </div>
                    </div>
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
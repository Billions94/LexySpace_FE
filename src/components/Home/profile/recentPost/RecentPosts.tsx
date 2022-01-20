import { useSelector } from "react-redux"
import { ReduxState } from "../../../../redux/interfaces"

interface RecentPostsProps {
    id: string | undefined
}

const Recentposts = ({ id }: RecentPostsProps) => {
    
    const posts = useSelector((state: ReduxState) => state.posts)
    const { user } = useSelector((state: ReduxState) => state.data)
    

    return(
        <div id="recentPost">
        {
            posts.map(post => (
                <>
                {
                    id === post.user._id ?
                    <div>
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
    )
}

export default Recentposts
import { useSelector } from "react-redux"
import { ReduxState } from "../../../../redux/interfaces"

const Recentposts = () => {
    
    const posts = useSelector((state: ReduxState) => state.posts)
    const { user } = useSelector((state: ReduxState) => state.data)
    const me = user!._id

    return(
        <>
        {
            posts.map(post => (
                <>
                {
                    me === post.user._id ?
                    <div>
                        <img src={post.cover} alt='' />
                        <div>
                            {post.text}
                        </div>
                    </div>
                    : null
                }
                </>
            ))
        }
        </>
    )
}

export default Recentposts
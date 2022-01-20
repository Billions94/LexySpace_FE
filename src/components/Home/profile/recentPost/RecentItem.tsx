import { Posts } from '../../../../redux/interfaces'
import { useNavigate } from 'react-router-dom'


interface RecentItemProps {
    post: Posts
}

const RecentItem = ({ post }: RecentItemProps) => {

    const navigate = useNavigate()

    return (
        <>
            <div className="postContainer ml-3"
                onClick={() => navigate(`/posts/${post._id}`)}>
                <img src={post.cover} alt='' width={45} height={45} />
                <div>
                    {post.text}
                </div>
            </div>
        </>
    )
}

export default RecentItem
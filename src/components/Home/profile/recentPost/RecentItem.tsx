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
                <img src={post.cover} alt='' width={150} height={150} />
                <div className='mb-2'>
                    <span>{post.text}</span>
                </div>
                <div className="d-flex justify-content-between">
                    <div>
                        <button className='candl'>
                            <img className="interactions" src="https://img.icons8.com/dotty/50/000000/send-comment.png"
                                width='20px'/>
                        </button>
                        {post.comments.length}
                    </div>
                    <div>
                        <button className='candl'>
                            <img className="interactions" 
                          src="https://img.icons8.com/plasticine/50/000000/hearts.png"
                          width='25px'/>
                        </button>
                         {post.likes.length}
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecentItem
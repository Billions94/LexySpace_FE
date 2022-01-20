import { Posts } from '../../../../redux/interfaces'


interface RecentItemProps {
    post: Posts
}

const RecentItem = ({ post }: RecentItemProps) => {
    return (
        <>
            <div className="postContainer ml-3">
                <img src={post.cover} alt='' width={45} height={45} />
                <div>
                    {post.text}
                </div>
            </div>
        </>
    )
}

export default RecentItem
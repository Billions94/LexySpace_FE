import { Posts } from '../../../../redux/interfaces'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { reRouteAction, GET_BLOGS } from '../../../../redux/actions'


interface RecentItemProps {
  post: Posts
}

const RecentItem = ({ post }: RecentItemProps) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const route = (id: string | undefined) => {
    navigate(`/posts/${id}`)
    dispatch(reRouteAction(true))
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const apiUrl = process.env.REACT_APP_GET_URL
  // const getData = async () => {
  //   try {
  //     const response = await fetch(`${apiUrl}/posts`)
  //     if (response.ok) {
  //       const { posts } = await response.json()
  //       const newPost = posts.reverse()
  //       console.log('here is the post', newPost)
  //       dispatch({
  //         type: GET_BLOGS,
  //         payload: newPost
  //       })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div className='recentItem mb-3' onClick={() => route(post._id)}>
      <div className="">
        <div className='circleBorders'>
          {!post.media ? <h6>{post.text}</h6> :
            <div>
              {post.media && post.media.split('.').slice(-1).join().match(`heic|png|jpg|gif|pdf|jpeg`) &&
                <img src={post.media} className="media" alt='' />
              }
              {post.media && post.media.split('.').slice(-1).join().match(`mp4|MPEG-4|mkv`) &&
                <video src={post.media} className="media" controls autoPlay muted></video>}
            </div>
          }
          {/* <BlogItem {...post} getData={getData} /> */ }
        </div>
      </div>
    </div>
  )
}

export default RecentItem
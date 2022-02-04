import { Posts, ReduxState } from '../../../../redux/interfaces'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reRouteAction, GET_BLOGS } from '../../../../redux/actions'
import BlogItem from '../../blog-item/BlogItem'


interface RecentItemProps {
    post: Posts
}

const RecentItem = ({ post }: RecentItemProps) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { reroute } = useSelector((state: ReduxState) => state.data)
    const route = (id: string | undefined) => {
        navigate(`/posts/${id}`)
        dispatch(reRouteAction(true))
    }

    const apiUrl = process.env.REACT_APP_GET_URL
   const getData = async () => {
    try {
      const response = await fetch(`${apiUrl}/posts`)
      if (response.ok) {
        const { posts } = await response.json()
        const newPost = posts.reverse()
        console.log('here is the post', newPost)
        dispatch({
          type: GET_BLOGS,
          payload: newPost
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

    return (
        <div className='recentItem mb-3'>
            <BlogItem {...post} getData={getData} />
        </div>
    )
}

export default RecentItem
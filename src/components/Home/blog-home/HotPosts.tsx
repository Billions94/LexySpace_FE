import { useEffect } from "react"
import { Badge, Image } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { GET_BLOGS } from "../../../redux/actions"
import { ReduxState } from "../../../redux/interfaces"
import Loader from "../loader/Loader"
import "./styles.scss"


const HotPosts = () => {

    const apiUrl = process.env.REACT_APP_GET_URL

    const dispatch = useDispatch()
    const posts = useSelector((state: ReduxState) => state.posts)

   
    const newPost = posts.map(p => p).sort((a,b) => b.likes.length - a.likes.length)

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

      const length = newPost.map(p => p)

      useEffect(() => {
        getData()
      }, [length.length])
    
    return (
        <div id='hotposts'>
            <h4 className="text-muted"># Top Posts</h4>
            { newPost && newPost ?
                newPost.map((p, i) => (
                <Link key={i}  className="text-decoration-none text-dark" to={`/posts/${p._id}`}>
                    <div key={i} className="d-flex hotpostList mb-2">
                        <div> <Image roundedCircle src={p.cover} alt="" width="37" height="37" /></div>
                        <div className="mb-2 ml-3 text">
                            <p className="strong">{p.text}</p>
                        </div>
                        <div className="ml-auto">
                        <Badge pill variant="secondary">
                            {p.likes.length}
                        </Badge>
                        </div>
                    </div>  
                </Link>  
                )) 
                : ( <Loader /> )
            }
        </div>
    ) 
}

export default  HotPosts
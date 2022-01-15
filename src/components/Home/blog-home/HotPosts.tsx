import { useEffect } from "react"
import { Badge, Image } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { ReduxState } from "../../../redux/interfaces"
import Loader from "../loader/Loader"


const HotPosts = () => {

    const posts = useSelector((state: ReduxState) => state.posts)
   
    const newPost = posts.map(p => p).sort((a,b) => b.likes.length - a.likes.length)
    
    return (
        <div id='hotposts'>
            <h4 className="text-muted"># Top Posts</h4>
            { newPost && newPost ?
                newPost.map(p => (
                <Link className="text-decoration-none text-dark" to={`/posts/${p._id}`}>
                    <div className="d-flex hotpostList mb-2">
                        <div> <Image roundedCircle src={p.cover} alt="" width="37" height="37" /></div>
                        <div className="mb-2 ml-2 text">
                            <p className="strong">{p.text}</p>
                        </div>
                        <div className="ml-auto">
                        <Badge pill className="secondary">
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
import { createRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { GET_BLOGS } from "../../../redux/actions"
import { ReduxState } from "../../../redux/interfaces"
import { Col, Row } from "react-bootstrap"
import { Badge } from "react-bootstrap"


const PostContainer = () => {

    const url = process.env.REACT_APP_GET_URL
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state: ReduxState) => state.data)
    const userName = user!.userName
    const [post, setPost] = useState('')
    const [image, setImage] = useState<string>('')
    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const target = (e: any) => {
        console.log(e.target.files[0])
        if (e.target && e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const inputBtn = createRef<HTMLInputElement>()

    const openInputFile = () => {
        inputBtn!.current!.click()
    }

    const newPost = async () => {
        if (image) {
            try {
                const response = await fetch(`${url}/posts/${userName}`, {
                    method: "POST",
                    body: JSON.stringify(post),
                    headers: { 'Content-Type': 'application/json' }
                })
                if (response.ok) {
                    const data = await response.json()
                    console.log('post successful', data)
                    setPost('')
                    try {
                        const formDt = new FormData()
                        formDt.append("cover", image)
                        let postImage = await fetch(`${url}/posts/${data._id}/upload`, {
                            method: "PUT",
                            body: formDt,
                        })
                        if (postImage.ok) {
                            navigate('/home')
                            getPosts()
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const response = await fetch(`${url}/posts/${userName}`, {
                    method: "POST",
                    body: JSON.stringify(post),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (response.ok) {
                    setPost('')
                    getPosts()
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const getPosts = async () => {
        try {
            const response = await fetch(`${url}/posts`)
            if (response.ok) {
                const { posts } = await response.json()
                const newPost = posts.reverse()
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
        <Row id='Row' className='justify-content-center mb-0'>
            <div className='col'>
                <div className="postContainer">
                    <div >
                        <img src={user.image} alt=''
                            className='img'
                            width='47' height='47' />
                    </div>
                    <div className="p-2 w-100">
                        <div className='textareaborder'>
                            <textarea className="form-control textarea"
                                rows={2}
                                placeholder="start typing to share your thoughts...."
                                value={post}
                                onChange={(e) => setPost(e.target.value)}/>
                        </div>
                        <div className="d-flex sharebtn">
                        <div onMouseEnter={handleShow} onMouseLeave={handleClose}
                                className="relative">
                            <button onClick={openInputFile} className="btn btn-sm btnIcon">
                            <input type="file" ref={inputBtn} className="d-none" onChange={(e)=> target(e)} />
                                <img src="https://img.icons8.com/wired/50/000000/picture.png" alt='' height='23px' width='23px'/>
                            </button>
                            { show === false ? null :
                            <div className="absolute">
                                <Badge variant='secondary' className='badge'>
                                    Media
                                </Badge>
                            </div>
                            }
                        </div>
                        <div className="mar-top clearfix mt-2 ml-auto">      
                            <button className="btn btn-md modal-btn"
                                onClick={() => newPost()}>
                                <i className="fa fa-pencil fa-fw" /> Share
                            </button>
                           
                        </div>
                        </div>
                    </div>
                </div>
            </div>

        </Row>
    )
}

export default PostContainer
import { createRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { GET_BLOGS } from "../../../redux/actions"
import { ReduxState } from "../../../redux/interfaces"
import { Row, Badge } from "react-bootstrap"
import Picker from 'emoji-picker-react'



const PostContainer = () => {

    const url = process.env.REACT_APP_GET_URL
    // const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state: ReduxState) => state.data)
    const userName = user!.userName
    const [post, setPost] = useState({text: ''})
    const [image, setImage] = useState<string>('')
    const [show, setShow] = useState(false)
    const [showEmoji, setShowEmoji] = useState(false)

    const toggleEmoji = () => {
        showEmoji === false ? setShowEmoji(true) : setShowEmoji(false)
    }

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

    // Emojis 
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event: any, emojiObject: any) => {
      setChosenEmoji(emojiObject);
    };

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
                    try {
                        const formDt = new FormData()
                        formDt.append("cover", image)
                        let postImage = await fetch(`${url}/posts/${data._id}/upload`, {
                            method: "PUT",
                            body: formDt,
                        })
                        if (postImage.ok) {
                            setPost({ text:'' })
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
                    setPost({ text: '' })
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
                                value={post.text}
                                onChange={(e) => setPost({...post, text: e.target.value})}/>
                        </div>
                        <div className="d-flex sharebtn">
                        <div className="relative">
                            <button onMouseEnter={handleShow} onMouseLeave={handleClose}
                            onClick={openInputFile} className="btn btn-sm btnIcon">
                            <input type="file" ref={inputBtn} className="d-none" onChange={(e)=> target(e)} />
                                {/* <img src="https://img.icons8.com/wired/50/000000/picture.png" alt='' height='23px' width='23px'/> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#f91880" className="bi bi-card-image" viewBox="0 0 16 16">
                                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
                                </svg>
                            </button>
                            { show === false ? null :
                            <div className="absolute">
                                <Badge variant='secondary' className='badge'>
                                    Media
                                </Badge>
                            </div>
                            }

                            <svg onClick={() => toggleEmoji()} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f91880" className="bi bi-emoji-smile ml-2" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                            </svg>

                            { showEmoji === false ? null :
                                <Picker onEmojiClick={onEmojiClick}  
                                pickerStyle={{ width: '100%' }}/>
                            }
                        </div>
                        <div className="mar-top clearfix mt-2 ml-auto">      
                            <button className="btn btn-md modal-btn"
                                onClick={() => newPost()}>
                                <i className="fa fa-pencil fa-fw" /> Post
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
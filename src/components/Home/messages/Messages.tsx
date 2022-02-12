import { Container, Row, Col, Form, FormControl, ListGroup } from 'react-bootstrap'
import { Button, Dropdown, ListGroupItem } from 'react-bootstrap'
import { useState, useEffect, FormEvent, useMemo, useCallback, createRef } from 'react'
import { io } from 'socket.io-client'
import { IHome } from "../../../interfaces/IHome"
import IMessage from '../../../interfaces/IMessage'
import { UserId } from '../../../interfaces/UserID'
import { IUser } from '../../../interfaces/IUser'
import { Room } from '../../../interfaces/Room'
import { useNavigate, useParams } from 'react-router-dom'
import { getUsersAction } from '../../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { ReduxState, User } from '../../../redux/interfaces'
import useAuthGuard from "../../../lib/index"
import "./styles.scss"


const ADDRESS = process.env.REACT_APP_GET_URL!

// CHAIN OF EVENTS/OPERATIONS:
// 1) CONNECT TO THE SERVER
// 2) SET YOUR USERNAME
// 3) BE NOTIFIED WHEN ANOTHER USER CONNECTS
// 4) ...send messages!

const Messages = () => {

  useAuthGuard()

  const apiUrl = process.env.REACT_APP_GET_URL
  const [username, setUsername] = useState<string | undefined>('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [message, setMessage] = useState('')
  const [onlineUsers, setOnlineUsers] = useState<IUser[]>([])
  const [chatHistory, setChatHistory] = useState<IMessage[]>([])
  const [userId, setUserId] = useState<UserId | undefined>('')
  const [room, setRoom] = useState<Room | undefined>('')
  const [media, setMedia] = useState<string>('')
  const [input, setInput] = useState({ text: '' })


  console.log('we are the user id', userId)

  const navigate = useNavigate()
  const { id } = useParams()

  const dispatch = useDispatch()
  const { user } = useSelector((state: ReduxState) => state.data)
  const [users, setUsers] = useState<User | null>(null)

  const getAllUsers = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(`${apiUrl}/users`, {
        headers: { Authorization: `Bearer ${token}`}
      })
      if(response.ok) {
        const data: User = await response.json()
        console.log(' i am the data', data)
        setUsers(data)
      } else throw new Error('Could not get users from the server :(')
    } catch (error) {
      console.log(error)
    }
  }

  console.log(users)

  const socket = useMemo(() => {
    return io(ADDRESS, { transports: ['websocket'] })
  }, [])

  useEffect(() => {
    getAllUsers()
  }, [])

  useEffect(() => {
    dispatch(getUsersAction())
    setUsername(user!.userName)
  }, [])

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connection established!')
    })

    socket.on('loggedin', () => {
      console.log("you're logged in!")
      fetchOnlineUsers()

      socket.on('newConnection', () => {
        console.log('watch out! a new challenger appears!')
        fetchOnlineUsers()
      })
    })

    socket.on('message', (newMessage: IMessage) => {
      console.log('a new message appeared!')
      setChatHistory((chatHistory) => [...chatHistory, newMessage])
    })

    
    return () => {
      socket.on('disconnect', () => {
        fetchOnlineUsers()
      })
      socket.disconnect()
    }

  }, [])

  useEffect(() => {
    username && socket.emit('setUsername', { userName: username, image: user!.image, room: id })
  }, [username])
  
  const trigger = (id: string) => {
    navigate(`/messages/${id}`)
    // setRoom(id)  
  }

  useEffect(() => {
    setLoggedIn(true)
  }, [])


  const fetchPreviousMessages = useCallback(async () => {
    try {
      let response = await fetch(`${ADDRESS}/messages/room`)
      if (response) {
        let data = await response.json()
        // data is an array with all the current connected users
        setChatHistory(data.chatHistory)
      } else {
        console.log('error fetching the online users')
      }
    } catch (error) {
      console.log(error)
    }
  }, [room])

  useEffect(() => {
    socket.on("loggedin", fetchPreviousMessages)

    return () => { socket.off("loggedin", fetchPreviousMessages) }
  }, [fetchPreviousMessages])


  console.log(username)

  const handleMessageSubmit = (e: FormEvent) => {
    e.preventDefault()

    const newMessage: IMessage = {
      text: message,
      sender: username,
      image: user.image,
      media: media,
      socketId: socket.id,
      timestamp: Date.now(), // <-- ms expired 01/01/1970
    }

    socket.emit('sendmessage', { message: newMessage, room: id })
    setChatHistory([...chatHistory, newMessage])
    setMessage('')
  }

  const fetchOnlineUsers = async () => {
    try {
      let response = await fetch(ADDRESS + '/online-users')
      if (response) {
        let data: { onlineUsers: IUser[] } = await response.json()
        // data is an array with all the current connected users
        setOnlineUsers(data.onlineUsers)
      } else {
        console.log('error fetching the online users')
      }
    } catch (error) {
      console.log(error)
    }
  }

  // onlineUsers.filter(user => user.room === room).map((user, i) => console.log(user.socketId))
  const target = (e: any) => {
    console.log(e.target.files[0])
    if (e.target && e.target.files[0]) {
      setMedia(e.target.files[0])
    }
  }

  const inputBtn = createRef<HTMLInputElement>()

  const openInputFile = () => {
    inputBtn!.current!.click()
  }

  const reciever = onlineUsers.find(user => user.socketId === id)
  const index = onlineUsers.findIndex(u => u.userName === user.userName)
  console.log('index', index)

  const notification = chatHistory.length > 0



  return (
    <Container fluid className='customRowDm p-0'>
      <Row id='dmContainer' className='mx-auto p-0 customDmRow'>

        <Col className="customCol1 ml-auto" sm={5} md={3} lg={3}>
          <div className="d-flex customMess">
            <h3 className="dmUserName mt-2 ml-2">{user.userName}</h3>
          </div>

          <div id="input-container" className="panel-body"></div>

          <div className="listofDM mt-4">
            {onlineUsers.length > 0 ? <div>{onlineUsers.length - 1} user online</div> : <>No user online</>}
            <ListGroup variant={'flush'} className="mt-3 customList">
              {onlineUsers.filter(u => u.userName !== user.userName).map((user, i) => (
                <div onClick={() => trigger(user.socketId)}
                  key={i} className="dmHeader  d-flex">
                  <img src={user.image}
                    className="roundpic" alt='' width={37} height={37} />
                  <div className="ml-2 dmUserName">
                    <div>{user.userName}</div>
                    <img src="https://img.icons8.com/ios-filled/50/26e07f/new-moon.png"
                      width={10} height={10} />
                  </div>
                  {notification && chatHistory.find(m => m.sender === user.userName) &&
                    <div className='ml-auto'>
                      <img src="https://img.icons8.com/ios-glyphs/50/ffffff/new.png" alt='' width='25px' />
                    </div>
                  }
                </div>
              ))}
            </ListGroup>
          </div>
        </Col>


        <Col className="mr-auto customCol2" sm={7} md={6} lg={5}>
          {!reciever ? null :
            <div className="dmHeader1 d-flex">
              <img src={reciever!.image}
                className="roundpic" alt='' width={37} height={37} />
              <div className="ml-2 dmUserName">
                <span>{reciever!.userName}</span>
              </div>
            </div>
          }

          {!reciever ?
            <div className='d-flex beforeConvo mt-2'>
              <div className='text-muted px-3 mt-2'>
                <span className='noMessages'>No Messages :(</span>
              </div>
            </div> : null
          }

          {!reciever ? null :
            <div className='messageBody'>
              <div className='customDmBody mt-3'>
                {chatHistory.map((message, i) => (
                  <div key={i} className="d-flex">
                    {/* <div>
                <img src={message.image} 
                className="roundpic" alt=''   width={37} height={37}/>
              </div>  
              <div className="ml-2 dmUserName">
                <strong>{message.sender}</strong>
                <p className="dmBubble ml-2">{message.text}</p>
                <span>{new Date(message.timestamp).toLocaleTimeString('en-US')}</span>
              </div> */}
                    {
                      user!.userName !== message.sender ?
                        <>
                          <div className='d-flex'>
                            <img src={message.image}
                              className="roundpic" alt='' width={37} height={37} />
                            <div className="ml-2 dmUserName">
                              <p className="dmBubble m-0">{message.text}
                              </p>
                              <h1 className='h1'>{new Date(message.timestamp).toLocaleTimeString('en-US')}</h1>
                            </div>
                          </div>
                        </>
                        :
                        <div style={{ marginLeft: 'auto' }}>
                          <div className='d-flex'>
                            <img src={message.image}
                              className="roundpic" alt='' width={37} height={37} />
                            <div className="ml-2 dmUserName">
                              <p className="dmBubble1 m-0">{message.text}</p>
                              <h1 className='h1'>{new Date(message.timestamp).toLocaleTimeString('en-US')}</h1>
                            </div>
                          </div>
                        </div>
                    }
                  </div>
                ))}
              </div>
              <div className="textAreaDm">

                <div id='textArea-container' className="panel-body">
                  <svg id='input-icon1' xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="#f91880" className="bi bi-emoji-smile ml-2" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                  </svg>
                  {/* <img  id='input-icon' onClick={openInputFile} className="btn btn-sm uploadicons"
                        src="https://img.icons8.com/wired/50/000000/picture.png" alt='' width='50px'/> */}
                  <div>
                    {!message ?
                      <div>
                        <input type="file" ref={inputBtn} className="d-none" onChange={target} />
                        <svg id='input-icon' onClick={openInputFile} xmlns="http://www.w3.org/2000/svg" width="50px" height="18" fill="#f91880" className="bi bi-card-image btn btn-sm uploadicons" viewBox="0 0 16 16">
                          <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                          <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                        </svg>
                      </div> :
                      <button className="btn ml-auto btn-sm sendBtnDm"
                        onClick={(e) => handleMessageSubmit(e)}>
                        <i className="fa fa-pencil fa-fw" /> send
                      </button>
                    }
                  </div>
                  <Form.Control className="form-control dmText search"
                    placeholder="Message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} />
                </div>
              </div>
            </div>
          }
        </Col>

      </Row>
    </Container>
  )
}

export default Messages

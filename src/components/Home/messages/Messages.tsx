import { Container, Row, Col, Form, ListGroup, Image } from 'react-bootstrap'
import { useState, useEffect, FormEvent, useMemo, useCallback, createRef, KeyboardEvent } from 'react'
import { io } from 'socket.io-client'
import { IUser } from '../../../interfaces/IUser'
import { useParams } from 'react-router-dom'
import { getUsersAction } from '../../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Message, ReduxState, Rooms, User } from '../../../redux/interfaces'
import useAuthGuard from "../../../lib/index"
import "./styles.scss"
import API from '../../../lib/API'
import Convo from './Conversation'
import OnlineUsers from './OnlineUsers'
import { isTypingGif } from '../../../redux/store'


const ADDRESS = process.env.REACT_APP_GET_URL!


const Messages = () => {

  useAuthGuard()


  const { id } = useParams()

  const dispatch = useDispatch()

  const { user } = useSelector((state: ReduxState) => state.data)

  const me = user!._id

  const [username, setUsername] = useState<string | undefined>('')

  const [media, setMedia] = useState<string>('')

  // const [input, setInput] = useState({ text: '' })
  const [isTyping, setIsTyping] = useState(false)

  const [onlineUsers, setOnlineUsers] = useState<IUser[]>([])

  const [message, setMessage] = useState('')

  const [currentChat, setCurrentChat] = useState<Rooms | null>(null)

  const [chatHistory, setChatHistory] = useState<Message[]>([])

  const [conversation, setConversation] = useState<Rooms[]>([])

  const [users, setUsers] = useState<User[] | null>(null)

  const [arrivalMessage, setArrivalMessage] = useState<any | null>(null)

  const [selectedIndex, setSelectedIndex] = useState<number>()

  const scrollRef = createRef<HTMLDivElement>()



  const getAllUsers = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(`${ADDRESS}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.ok) {
        const data: User[] = await response.json()
        setUsers(data)
      } else throw new Error('Could not get users from the server :(')
    } catch (error) {
      console.log(error)
    }
  }


  const socket = useMemo(() => {
    return io(ADDRESS, { transports: ['websocket'] })
  }, [])

  useEffect(() => {
    const getConversation = async () => {
      try {
        const { data } = await API.get<Rooms[]>(`/rooms/${me}`)
        setConversation(data)
      } catch (error) {
        console.log(error)
      }
    }
    getConversation()
  }, [me])


  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await API.get<Message[]>(`/messages/${currentChat?._id}`)
        if (data) {
          setChatHistory(data)
        } else throw new Error('Could not get messages')
      } catch (error) {
        console.log(error)
      }
    }
    getMessages()
  }, [currentChat])

  useEffect(() => {
    getAllUsers()
  }, [])

  useEffect(() => {
    dispatch(getUsersAction())
    setUsername(user!.userName)
  }, [currentChat])

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

    socket.on('getUsers', (users: IUser[]) => {
      setOnlineUsers(users)
    })

    socket.on('typing', () => {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
      }, 3000)
    })

    socket.on('message', (newMessage) => {
      console.log('a new message appeared!')
      setArrivalMessage(newMessage.message)
      setChatHistory((chatHistory) => [...chatHistory, newMessage.message])
    })



    return () => {
      socket.on('disconnect', () => {
        fetchOnlineUsers()
      })
      socket.disconnect()
    }

  }, [])


  useEffect(() => {
    console.log('currentChat.members', currentChat?.members)
    arrivalMessage && currentChat?.members.includes(arrivalMessage.receiver) &&
      setChatHistory(prev => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    username && socket.emit('setUsername', { userId: me, userName: username, image: user!.image })
  }, [username])


  const fetchPreviousMessages = useCallback(async () => {
    try {
      let response = await fetch(`${ADDRESS}/rooms`)
      if (response) {
        let data = await response.json()
        // data is an array with all the current connected users
        setChatHistory(data)
      } else {
        console.log('error fetching the online users')
      }
    } catch (error) {
      console.log(error)
    }
  }, [currentChat])

  useEffect(() => {
    socket.on("loggedin", fetchPreviousMessages)

    return () => { socket.off("loggedin", fetchPreviousMessages) }
  }, [fetchPreviousMessages])



  const handleMessageSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const receiverID = currentChat?.members.find(m => m._id !== me)

    const newMessage: Message = {
      roomId: currentChat?._id,
      text: message,
      sender: me,
      receiver: receiverID?._id,
      image: user.image,
      media: media,
      createdAt: Date.now(),
    }

    socket.emit('sendmessage', { message: newMessage })

    try {
      const { data } = await API.post(`/messages`, newMessage)
      if (data) {
        setChatHistory((chatHistory) => [...chatHistory, data])
        setMessage('')
      } else throw new Error('Could not send message :(')
    } catch (error) {
      console.log(error)
    }

  }


  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatHistory])


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
    if (e.target && e.target.files[0]) {
      setMedia(e.target.files[0])
    }
  }

  const inputBtn = createRef<HTMLInputElement>()

  const openInputFile = () => {
    inputBtn!.current!.click()
  }

  // Getting the exact user to display their info on the message header
  const singleMsg = chatHistory.find(m => m.receiver === undefined)
  const actualRoom = conversation?.find(r => r._id === singleMsg?.roomId)
  const receiver = actualRoom?.members.find(m => m._id !== me)
  // Check the current User typing
  const typer = chatHistory && chatHistory.find(m => m.sender !== user!._id)



  const trigger = () => {
    socket.emit('typing')
  }


  const handleKeyboardEvent = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key.match('[^~,][^~,]*')) {
      trigger()
    } 
    if(e.key === 'Enter') {
      handleMessageSubmit(e)
    }
  }

  return (
    <Container fluid className='customRowDm p-0'>
      <Row id='dmContainer' className='mx-auto p-0 customDmRow'>

        <Col className="customCol1 ml-auto" sm={5} md={3} lg={3}>
          <div className="d-flex customMess">
            <h3 className="dmUserName mt-2 ml-2">{user.userName}</h3>
          </div>

          <div id="input-container" className="panel-body"></div>

          <OnlineUsers
            onlineUsers={onlineUsers}
            currentUser={user}
            conversation={conversation}
            currentChat={currentChat}
            setCurrentChat={setCurrentChat} />

          <div className=''>
            <div className='conversations d-flex'>
              <div>Conversations ( {conversation.length} )</div>
              <div className='ml-auto'>
                <img src='https://assets.website-files.com/5d015870ec9646043c2f3127/5ebc2a49a428098290267716_ezgif.com-optimize%20(18).gif' alt='' width='25px' />
              </div>
            </div>
          </div>


          <ListGroup variant={'flush'} className="mt-3 listofDM">
            {conversation && conversation.map((room, i) => (
              <ListGroup.Item className='customList' >
                <Convo
                  key={i}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                  index={i}
                  room={room}
                  currentUser={user}
                  onlineUsers={onlineUsers}
                  currentChat={currentChat}
                  chatHistory={chatHistory}
                  setCurrentChat={setCurrentChat} />
              </ListGroup.Item>
            ))}
          </ListGroup>

        </Col>


        <Col className="mr-auto customCol2" sm={7} md={6} lg={5}>
          {!receiver ? null :
            <div className="dmHeader1 d-flex">
              <img src={receiver!.image}
                className="roundpic" alt='' width={37} height={37} />
              <div className="ml-2 dmUserName">
                <span>{receiver!.userName}</span>
              </div>
            </div>
          }

          {chatHistory.length === 0 ?
            <div className='d-flex beforeConvo mt-2'>
              <div className='text-muted px-3 mt-2'>
                <span className='noMessages'>Start a new conversation :)</span>
              </div>
            </div> 
            :
            <div className='messageBody'>
              <div className='customDmBody  pt-2'>
                {chatHistory.map((message, i) => (
                  <div ref={scrollRef} key={i} className="d-flex">
                    {
                      user._id !== message.sender ?
                        <>
                          <div className='d-flex'>
                            <img src={message.image}
                              className="roundpic" alt='' width={37} height={37} />
                            <div className="ml-2 dmUserName">
                              <p className="dmBubble m-0">{message.text}
                              </p>
                              <h1 className='h1'>{new Date(message.createdAt).toLocaleTimeString('en-US')}</h1>
                            </div>
                          </div>
                        </>
                        :
                        <div style={{ marginLeft: 'auto' }}>
                          <div className='d-flex'>
                            <div className="ml-2 dmUserName">
                              <p className="dmBubble1 m-0">{message.text}</p>
                              <h1 className='h2'>{new Date(message.createdAt).toLocaleTimeString('en-US')}</h1>
                            </div>
                          </div>
                        </div>
                    }
                  </div>
                ))}
              </div>

              {isTyping === true && 
                <div className='mb-2 ml-2'>
                  <Image roundedCircle src={typer?.image} alt='' width='30px' height='30px'/> 
                  <Image src={isTypingGif} alt=''width='50px' height='30px' />
                </div>
              }

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
                    onKeyPress={handleKeyboardEvent}
                    onChange={(e) => setMessage(e.target.value)}/>
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

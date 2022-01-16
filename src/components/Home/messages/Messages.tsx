import { Container, Row, Col, Form, FormControl, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { useState, useEffect, FormEvent, useMemo, useCallback } from 'react'
import { io } from 'socket.io-client'
import { IHome } from "../../../interfaces/IHome"
import IMessage from '../../../interfaces/IMessage'
import { UserId } from '../../../interfaces/UserID'
import { IUser } from '../../../interfaces/IUser'
import { Room } from '../../../interfaces/Room'
import { useNavigate, useParams } from 'react-router-dom'
import { getUsersAction } from '../../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { ReduxState } from '../../../redux/interfaces'
import useAuthGuard from "../../../lib/index"


const ADDRESS = process.env.REACT_APP_GET_URL! 

// CHAIN OF EVENTS/OPERATIONS:
// 1) CONNECT TO THE SERVER
// 2) SET YOUR USERNAME
// 3) BE NOTIFIED WHEN ANOTHER USER CONNECTS
// 4) ...send messages!

const Messages = () => {

  useAuthGuard()

  const [username, setUsername] = useState<string | undefined>('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [message, setMessage] = useState('')
  const [onlineUsers, setOnlineUsers] = useState<IUser[]>([])
  const [chatHistory, setChatHistory] = useState<IMessage[]>([])
  const [userId, setUserId] = useState<UserId | undefined>('')
  const [room, setRoom] = useState<Room | undefined>('blue')
  console.log('we are the user id', userId)

  const navigate = useNavigate()
  const { id } = useParams()

  const dispatch = useDispatch()
  const { user } = useSelector((state: ReduxState) => state.data)

  const socket = useMemo(() => {
    return io(ADDRESS, { transports: ['websocket'] })
  }, [])

  useEffect(()=> {
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
      socket.disconnect()
    }

  }, [])

  useEffect(() => {
    username && socket.emit('setUsername', { userName: username, room: room })
  }, [username])

  useEffect(() => {
    setRoom(room)
    setLoggedIn(true)
  }, [])

  const fetchPreviousMessages = useCallback(async () => {
    try {
      let response = await fetch(ADDRESS + '/messages/' + room)
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


  return (
    <Container fluid className='px-4'>
      <Row className='my-3' style={{ height: '95vh' }}>
        <Col md={10} className='d-flex flex-column justify-content-between'>
          {/* for the main chat window */}
          {/* 3 parts: username input, chat history, new message input */}
          {/* TOP SECTION: USERNAME INPUT FIELD */}
 
          {/* MIDDLE SECTION: CHAT HISTORY */}
          <ListGroup>
            {chatHistory.map((message, i) => (
              <ListGroupItem key={i}>
                <strong>{message.sender}</strong>
                <span className='mx-1'> | </span>
                <span>{message.text}</span>
                <span className='ml-2' style={{ fontSize: '0.7rem' }}>
                  {new Date(message.timestamp).toLocaleTimeString('en-US')}
                </span>
              </ListGroupItem>
            ))}
          </ListGroup>
          {/* BOTTOM SECTION: NEW MESSAGE INPUT FIELD */}
          <Form onSubmit={handleMessageSubmit}>
            <FormControl
              placeholder='Insert your message here'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={!loggedIn}
            />
          </Form>
        </Col>
        <Col md={2} style={{ borderLeft: '2px solid black' }}>
          {/* for the currently connected clients */}
          <div className='mb-3'>Connected users:</div>
          <ListGroup>
            {onlineUsers.length === 0 && <ListGroupItem>No users yet!</ListGroupItem>}
            {onlineUsers.filter(user => user.room === room).map((user, i) => (
              <ListGroupItem onClick={() => navigate(`/dm/${user.socketId}`)} key={i}>{user.userName}</ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default Messages

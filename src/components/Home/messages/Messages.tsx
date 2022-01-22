import { Container, Row, Col, Form, FormControl, ListGroup } from 'react-bootstrap'
import { Button, Dropdown, ListGroupItem  } from 'react-bootstrap'
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
import { ReduxState } from '../../../redux/interfaces'
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

  const [username, setUsername] = useState<string | undefined>('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [message, setMessage] = useState('')
  const [onlineUsers, setOnlineUsers] = useState<IUser[]>([])
  const [chatHistory, setChatHistory] = useState<IMessage[]>([])
  const [userId, setUserId] = useState<UserId | undefined>('')
  const [room, setRoom] = useState<Room | undefined>('blue')
  const [image, setImage] = useState<string>('')
  const [input, setInput] = useState({text: ''})


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
    username && socket.emit('setUsername', { userName: username, image: user!.image, room: id })
  }, [username])

  useEffect(() => {
    setRoom(id)
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
      image: user.image,
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
      setImage(e.target.files[0])
    }
  }

  const inputBtn = createRef<HTMLInputElement>()

  const openInputFile = () => {
    inputBtn!.current!.click()
  }

  const reciever = onlineUsers.find(user => user.socketId === id)
  const index = onlineUsers.findIndex(u => u.userName === user.userName)
  console.log('index', index)

  return (
    <div id='dmContainer'>
    <Row className='mx-auto pt-5 customDmRow'>
      <Container fluid className='customRowDm'>
       <Row className='justify-content-center'>
        <Col className="customCol1" sm={5} md={3}>
          <div className="d-flex customMess">
          <h3 className="text-center mt-2 ml-2">Messaging</h3>
          <div>
        <Dropdown>
          <Dropdown.Toggle className="customSetDrop" variant="success" id="dropdown-basic">
          <Button className="customSetDm">
            <img src="https://img.icons8.com/wired/50/000000/settings.png" alt='' width="17px" height="17px"/>
            </Button>
          </Dropdown.Toggle>

          <Dropdown.Menu className="customDrop">
            <div >
              <div>
                
              </div>
              <img src="https://img.icons8.com/cotton/50/000000/private-lock.png" alt='' width='18px'/>
              <span className="ml-2"> make dM private </span>
            </div>
            <div >
            <img src="https://img.icons8.com/dotty/50/000000/inbox-settings.png" alt='' width='18px'/>
            <span className="ml-2">dm Settings </span>
            </div>
          </Dropdown.Menu>
        </Dropdown>
          </div>
          </div>
        
          <div id="input-container" className="panel-body">
            <img id="input-icon"
              src="https://img.icons8.com/pastel-glyph/50/000000/search--v1.png"
              width="30" alt=''/>
            <input className="form-control shareComment search"
              placeholder="search Messages...."
              value={input.text}
              onChange={(e) =>
              setInput({ ...input, text: e.target.value })}/>
          </div>
          <div className="listofDM mt-4">
          <ListGroup variant={'flush'} className="mt-3 customList">
          {onlineUsers.filter(user => user.room === room).map((user, i) => (
            <div onClick={() => navigate(`/messages/${user.socketId}`)} 
                key={i} className="dmHeader  d-flex">
              <img src={user.image} 
              className="roundpic" alt=''   width={37} height={37}/>
              <div className="ml-2 dmUserName">
                <span>{user.userName}</span>
              </div>
            </div>
            ))}
          </ListGroup>
          </div>
        </Col>

      {/* <Col md={2} style={{ borderLeft: '2px solid black' }}>
         
          <div className='mb-3'>Connected users:</div>
          <ListGroup>
            {onlineUsers.length === 0 && <ListGroupItem>No users yet!</ListGroupItem>}
            {onlineUsers.filter(user => user.room === room).map((user, i) => (
              <ListGroupItem onClick={() => {navigate(`/messages/${user.socketId}`); setDmState(true)}} key={i}>
                {user.userName}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col> */}

      <Col className="mr-auto customCol2" sm={7} md={7}>
        { !reciever ? null :
          <div className="dmHeader d-flex">
            <img src={reciever!.image} 
            className="roundpic" alt=''   width={37} height={37}/>
            <div className="ml-2 dmUserName">
              <span>{reciever!.userName}</span>
            </div>
          </div>
        }  

        { !reciever ?
          <div className='d-flex beforeConvo mt-2'>
            <div className='text-muted px-3 mt-2'>
              <span className='noMessages'>No Messages :(</span>
            </div>
          </div> :  null 
        }

         { !reciever ? null :
      <>
        <div className='customDmBody mt-3'>
        { chatHistory.map((message, i) =>(
          <div key={i} className=" d-flex">
              <div>
                <img src={message.image} 
                className="roundpic" alt=''   width={37} height={37}/>
              </div>  
              <div className="ml-2 dmUserName">
                <strong>{message.sender}</strong>
                <p className="dmBubble ml-2">{message.text}</p>
                <span>{new Date(message.timestamp).toLocaleTimeString('en-US')}</span>
              </div>
          </div>
        ))}
        </div>
        <div className="textAreaDm">
            <div className="panel-body mt-3">
              <textarea
                className="form-control dmText"
                rows={2}
                placeholder="write a Message...."
                value={message}
                onChange={(e) => setMessage(e.target.value)}/>
              <div className="mt-2 btnTextArea">
                <div id=''>
                  <button onClick={openInputFile} className="btn btn-sm uploadicons">
                  <input type="file" ref={inputBtn} className="d-none" onChange={target} />
                    <img src="https://img.icons8.com/wired/50/000000/picture.png" alt='' width='17px'/>
                  </button>
                  <button onClick={openInputFile} className="btn btn-sm uploadicons ml-2">
                  <input type="file" ref={inputBtn} className="d-none" onChange={target} />
                    <img src="https://img.icons8.com/dotty/50/000000/attach.png" alt='' width='17px'/>
                  </button>
                </div>

                { !message ?  
                  null: 
                <button className="btn ml-auto btn-sm btn-dark sendBtnDm"
                        onClick={(e) => handleMessageSubmit(e)}>
                  <i className="fa fa-pencil fa-fw" /> send
                </button>
                }
              </div>
            </div>
        </div>
        </>
         } 
        </Col>
        </Row> 
    </Container>
      </Row>
      </div>
  )
}

export default Messages

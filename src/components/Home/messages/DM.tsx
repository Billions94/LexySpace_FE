import { Container, Row, Col, Form, FormControl, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { useState, useEffect, FormEvent, useMemo } from "react"
// import { IHome } from "../../../interfaces/IHome"
// import IMessage from '../../../interfaces/IMessage'
// import { UserId } from '../../../interfaces/UserID'
// import { IUser } from '../../../interfaces/IUser'
// import { Room } from '../../../interfaces/Room'
// import { io } from 'socket.io-client'
// import { useParams } from 'react-router-dom'

// const ADDRESS = process.env.REACT_APP_GET_URL!

const DM = () => {

//     const [username, setUsername] = useState('')
//     const [loggedIn, setLoggedIn] = useState(false)
//     const [message, setMessage] = useState('')
//     const [onlineUsers, setOnlineUsers] = useState<IUser[]>([])
//     const [chatHistory, setChatHistory] = useState<IMessage[]>([])
//     const [userId, setUserId] = useState<UserId | undefined>('')
//     console.log('we are the user id', userId)
//     const { id } = useParams()

//     const socket = useMemo(() => {
//         return io(ADDRESS, { transport: ['websocket'] })
//       }, [])


//     useEffect(() => {
//         socket.on('directmessage', (newMessage: IMessage) => {
//             setChatHistory((chatHistory) => [...chatHistory, newMessage])
//         })
//         fetchOnlineUsers()
//     }, [])



//     const handleMessageSubmit = (e: FormEvent) => {
//         e.preventDefault()

//         const newMessage: IMessage = {
//             text: message,
//             sender: username,
//             socketId: socket.id,
//             timestamp: Date.now(), // <-- ms expired 01/01/1970
//         }

//         socket.emit('dm', { message: newMessage, room: id })
//         setChatHistory([...chatHistory, newMessage])
//         setMessage('')
//     }

//     const fetchOnlineUsers = async () => {
//         try {
//             let response = await fetch(ADDRESS + `/online-users/` +id )
//             if (response) {
//                 let data: { onlineUsers: IUser[] } = await response.json()
//                 // data is an array with all the current connected users
//                 setOnlineUsers(data.onlineUsers)
//                 console.log('=========================>', data.onlineUsers)
//             } else {
//                 console.log('error fetching the online users')
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }

    

return (
        <Container fluid className='px-4'>
            {/* <Row className='my-3' style={{ height: '95vh' }}>
                <Col md={10} className='d-flex flex-column justify-content-between'>
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
                    <div className='mb-3'>Connected users:</div>
                    <ListGroup>
                        {
                           onlineUsers && onlineUsers.map(users => (
                            <ListGroupItem>{users.username}</ListGroupItem> 
                            ))
                        }
                    </ListGroup>
                </Col>
            </Row> */}
        </Container>
     )
}

export default DM
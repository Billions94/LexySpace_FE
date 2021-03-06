import { useNavigate } from 'react-router-dom'
import { Message, User } from '../../../redux/interfaces'

interface MessageBodyProps { 
    message: Message
    user: User
}

export const MessageBody = ({ user, message }: MessageBodyProps) => { 

    const navigate = useNavigate()

    return (
        <>
            {
                user._id !== message.sender ?
                    <>
                        <div className='d-flex'>
                            <img src={message.image} onClick={() => navigate(`/userProfile/${message.sender}`)}
                                style={{ cursor: 'pointer' }}
                                className="roundpic" alt='' width={37} height={37} />
                            <div className="ml-2 dmUserName">
                                <p style={{ cursor: 'default' }} className="dmBubble m-0">
                                    {message.text}
                                </p>
                                <h1 style={{ cursor: 'default' }} className='h1'>
                                    {new Date(message.createdAt).toLocaleTimeString('en-US')}
                                </h1>
                            </div>
                        </div>
                    </>
                    :
                    <div style={{ marginLeft: 'auto' }}>
                        <div className='d-flex'>
                            <div className="ml-2 dmUserName">
                                <p style={{ cursor: 'default' }} className="dmBubble1 m-0">{message.text}</p>
                                <h1 style={{ cursor: 'default' }} className='h2'>
                                    {new Date(message.createdAt).toLocaleTimeString('en-US')}
                                </h1>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}
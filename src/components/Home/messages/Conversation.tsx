import { useEffect, Dispatch, SetStateAction } from 'react'
import { useDispatch } from 'react-redux'
import { User, Rooms, Message } from '../../../redux/interfaces'
import { getUsersAction } from '../../../redux/actions'
import { ListGroup } from 'react-bootstrap'
import { IUser } from '../../../interfaces/IUser'

interface RoomProps {
    index: number
    room: Rooms
    selectedIndex: number | undefined
    setSelectedIndex: Dispatch<SetStateAction<number | undefined>>
    currentUser: User
    onlineUsers: IUser[]
    chatHistory: Message[]
    currentChat: Rooms | null
    setCurrentChat: (value: React.SetStateAction<Rooms | null>) => void
}

export default function Convo({ index, room, currentUser, chatHistory, onlineUsers, setCurrentChat, selectedIndex, setSelectedIndex }: RoomProps) {


    const dispatch = useDispatch()
    const member = room.members.find(members => members._id !== currentUser!._id)
    const activeStatus = onlineUsers.some(u => u._id === member!._id)

    function multiTask(index: number, room: Rooms) {
        setSelectedIndex(index)
        setCurrentChat(room)
    }

    useEffect(() => {
        dispatch(getUsersAction())
    }, [room])

    return (
        <ListGroup.Item id='convo' action active={index === selectedIndex}
            onClick={() => multiTask(index, room)}>
            <div className="d-flex">
                <>
                    <div className='onlineIconConvo'>
                        <img src={member!.image}
                            className="roundpic" alt='' width={37} height={37} />
                    </div>
                    {activeStatus === true ?
                        <div className='onlineBadgeConvo'>
                            <img src="https://img.icons8.com/ios-filled/50/26e07f/new-moon.png"
                                width={10} height={10} />
                        </div> : null
                    }
                </>
                <div className="ml-2">
                    <div className='dmUserName'>{member!.userName}</div>
                    <div className='textHolder'>
                        {chatHistory.map((message, i) => (
                            <>
                                {room!._id === message!.roomId &&
                                    <>
                                        {i === chatHistory.length - 1 &&
                                            <p className='text-light msgtext'>{message.text}</p>
                                        }
                                    </>
                                }
                            </>
                        ))}
                    </div>
                </div>
                {chatHistory.some(m => m.sender === currentUser!._id) &&
                    <div className='ml-auto'>
                        <img src="https://img.icons8.com/ios-glyphs/50/ffffff/new.png" alt='' width='25px' />
                    </div>
                }
            </div>
        </ListGroup.Item>
    )
}
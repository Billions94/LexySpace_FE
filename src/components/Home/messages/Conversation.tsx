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

export default function Convo(props: RoomProps) {

    const { index, room, currentUser, chatHistory, onlineUsers, setCurrentChat, selectedIndex, setSelectedIndex } = props

    const dispatch = useDispatch()
    const member = room.members.find(members => members._id !== currentUser!._id)
    const activeStatus = onlineUsers.some(u => u._id === member!._id)


    function multiTask(index: number, room: Rooms) {
        setSelectedIndex(index)
        setCurrentChat(room)
    }

    useEffect(() => {
        dispatch(getUsersAction())
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                                width={10} height={10} alt='' />
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
                {/* {notfication && chatHistory.some(m => m.sender === member!._id) &&
                    <div className='ml-auto'>
                        <img src="https://img.icons8.com/ios-glyphs/50/ffffff/new.png" alt='' width='25px' />
                    </div>
                } */}
            </div>
        </ListGroup.Item>
    )
}
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { User, Rooms, Message } from '../../../redux/interfaces'
import { getUsersAction } from '../../../redux/actions'
import { ListGroup } from 'react-bootstrap'

interface RoomProps {
    index: number
    room: Rooms
    currentUser: User
    chatHistory: Message[]
    currentChat: Rooms | null
    setCurrentChat: (value: React.SetStateAction<Rooms | null>) => void
}

export default function Convo({ index, room, currentUser, chatHistory, currentChat, setCurrentChat }: RoomProps) {

    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const selected = index === selectedIndex

    const dispatch = useDispatch()
    const member = room.members.find(members => members._id !== currentUser!._id)
    console.log(member)

    function multiTask(index: number, room: Rooms) {
        setSelectedIndex(index)
        setCurrentChat(room) 
    }

    useEffect(() => {
        dispatch(getUsersAction())
    }, [room])

    return (
        <ListGroup.Item id='convo'  action active={selected}
            onClick={() => multiTask(index, room)}>
            <div className="d-flex">
                <img src={member!.image}
                    className="roundpic" alt='' width={37} height={37} />
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
                {/* {notification && chatHistory.find(m => m.sender === user.userName) &&
                    <div className='ml-auto'>
                        <img src="https://img.icons8.com/ios-glyphs/50/ffffff/new.png" alt='' width='25px' />
                    </div>
                } */}
            </div>
        </ListGroup.Item>
    )
}
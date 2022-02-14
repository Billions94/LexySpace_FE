import { useState, useEffect, FormEvent, useMemo, useCallback, createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { User, ReduxState, Rooms, Message } from '../../../redux/interfaces'
import API from '../../../lib/API'
import { getUsersAction } from '../../../redux/actions'

interface RoomProps {
    room: Rooms
    currentUser: User
    chatHistory: Message[]
    currentChat: Rooms | null
}

export default function Convo({ room, currentUser, chatHistory, currentChat }: RoomProps) {

    const dispatch = useDispatch()
    const member = room.members.find(members => members._id !== currentUser!._id)

    useEffect(() => {
        dispatch(getUsersAction())
    }, [])

    return (
        <div id='convo'>
            <div className="dmHeader d-flex">
                <img src={member!.image}
                    className="roundpic" alt='' width={37} height={37} />
                <div className="ml-2">
                    <div className='dmUserName'>{member!.userName}</div>
                    <div className='textHolder'>
                        {chatHistory.map((message, i) => (
                            <>
                                {room!._id === message!.roomId &&
                                <> 
                                {i === chatHistory.length -1 && 
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
        </div>
    )
}
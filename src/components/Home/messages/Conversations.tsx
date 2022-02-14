import { useState, useEffect, FormEvent, useMemo, useCallback, createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { User, ReduxState, Rooms } from '../../../redux/interfaces'
import API from '../../../lib/API'
import { getUsersAction } from '../../../redux/actions'

interface RoomProps {
    room: Rooms
    currentUser: User
}

export default function Convo({ room, currentUser }: RoomProps) {

    const dispatch = useDispatch()
    const member = room.members.find(members => members._id !== currentUser!._id)

    useEffect(() => {
        dispatch(getUsersAction())
    }, [])

    return (
        <>
            <div className="dmHeader d-flex">
                <img src={member!.image}
                    className="roundpic" alt='' width={37} height={37} /> 
                 <div className="ml-2 dmUserName">
                    <div>{member!.userName}</div>
                    <img src="https://img.icons8.com/ios-filled/50/26e07f/new-moon.png"
                        width={10} height={10} />
                </div>
                {/* {notification && chatHistory.find(m => m.sender === user.userName) &&
                    <div className='ml-auto'>
                        <img src="https://img.icons8.com/ios-glyphs/50/ffffff/new.png" alt='' width='25px' />
                    </div>
                } */}
            </div>
        </>
    )
}
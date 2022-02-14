import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { IUser } from "../../../interfaces/IUser"
import { Rooms, User } from "../../../redux/interfaces"
import { defaultAvatar } from "../../../redux/store"
import { Image } from "react-bootstrap"
import API from "../../../lib/API"

interface OnlineUsersProps {
    onlineUsers: IUser[]
    currentUser: User
    // setCurrentChat: Dispatch<SetStateAction<Rooms | null>>
    setCurrentChat: (value: React.SetStateAction<Rooms | null>) => void
}

export default function OnlineUsers({ onlineUsers, currentUser, setCurrentChat }: OnlineUsersProps) {


    const handlClick = async (friend: IUser) => {
        try {
            const { data } = await API.get<Rooms[]>(`/rooms/find/${currentUser._id}/${friend._id}`)
            if(data) {
                const someDT = data[0]
                console.log('handleClick', someDT)
                setCurrentChat(someDT)
            } else throw new Error('Could not get chat')
        } catch (error) {
            console.log(error)
        }
    }

    
    return(
        <div id='onlineUserContainer'>
            <div className="mb-1">Online</div>
        {onlineUsers.filter(u => u.userName !== currentUser.userName).map(friend => (
        <div onClick={() => handlClick(friend)} style={{ cursor: 'pointer'}}>
            <div className="onlineIcon">
            <Image roundedCircle src={friend.image ? friend.image : defaultAvatar} alt='' width='37px'/>
            </div>
            <div className='onlineBadge'>
            <img src="https://img.icons8.com/ios-filled/50/26e07f/new-moon.png"
                width={10} height={10} />
            </div>
            <div className='username'>{friend.userName}</div>
        </div>
        ))}
        </div>
    )
}
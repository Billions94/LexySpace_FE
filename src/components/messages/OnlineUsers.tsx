import React from 'react';
import { Image } from 'react-bootstrap';
import { Socket } from 'socket.io-client';
import { defaultAvatar } from '../../assets/icons';
import { OnlineUser } from '../../interfaces/OnlineUser';
import API from '../../lib/API';
import { Rooms, User } from '../../redux/interfaces';

interface OnlineUsersProps {
  onlineUsers: OnlineUser[];
  currentUser: User;
  conversation: Rooms[];
  currentChat: Rooms | null;
  setCurrentChat: (value: React.SetStateAction<Rooms | null>) => void;
  setConversation: React.Dispatch<React.SetStateAction<Rooms[]>>;
  socket: Socket;
  setOpenConvo: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OnlineUsers({
  onlineUsers,
  currentUser,
  currentChat,
  setCurrentChat,
  conversation,
  setConversation,
  socket,
  setOpenConvo,
}: OnlineUsersProps) {
  const handleClick = async (friend: OnlineUser) => {
    if (!currentChat?.members.includes(currentUser)) {
      // here we should check if there's already a conversation going with the selected guy
      const conversationAlreadyOpened = conversation
        ?.map((m) => m.members)
        .flat(1)
        .find((c) => c.id === friend.id);
      if (conversationAlreadyOpened) {
        //we should here jump to the existing convo
        try {
          const { data } = await API.get<Rooms[]>(
            `/rooms/find/${currentUser.id}/${friend.id}`
          );
          if (data) {
            const someDT = data[0];
            console.log('handleClick', someDT);
            setCurrentChat(someDT);
            setOpenConvo(true);
          } else throw new Error('Could not get chat');
        } catch (error) {
          console.log(error);
        }
      } else {
        newConversation(friend);
      }
    }
  };

  const newConversation = async (friend: OnlineUser) => {
    try {
      const { data } = await API.post('/rooms', {
        senderId: currentUser.id,
        receiverId: friend.id,
      });
      if (data) {
        const newDT: Rooms = data[0];
        setCurrentChat(newDT);
        socket.emit('startConversation');
        setConversation((prev) => [...prev, data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="onlineUserContainer">
      <div className="mb-1">Online</div>
      <div className="d-flex">
        {onlineUsers
          .filter((user) => user.userName !== currentUser.userName)
          .map((friend) => (
            <div
              key={friend.id}
              className="mr-1"
              onClick={() => handleClick(friend)}
              style={{ cursor: 'pointer' }}
            >
              <div className="onlineIcon">
                <Image
                  roundedCircle
                  src={friend.image ? friend.image : defaultAvatar}
                  alt=""
                  width="37px"
                  height="37px"
                />
              </div>
              <div className="onlineBadge">
                <img
                  src="https://img.icons8.com/ios-filled/50/26e07f/new-moon.png"
                  width={10}
                  height={10}
                  alt=""
                />
              </div>
              <div className="username">{friend.userName}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

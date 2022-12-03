import React, { Dispatch, SetStateAction } from "react";
import { User, Rooms, Message } from "../../redux/interfaces";
import { Dropdown, ListGroup } from "react-bootstrap";
import { OnlineUser } from "../../interfaces/OnlineUser";
import { Socket } from "socket.io-client";
import API from "../../lib/API";

interface RoomProps {
  index: number;
  room: Rooms;
  selectedIndex: number | undefined;
  setSelectedIndex: Dispatch<SetStateAction<number | undefined>>;
  currentUser: User;
  onlineUsers: OnlineUser[];
  chatHistory: Message[];
  currentChat: Rooms | null;
  setCurrentChat: (value: React.SetStateAction<Rooms | null>) => void;
  notification: boolean;
  setOpenConvo: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Convo(props: RoomProps) {
  const {
    index,
    room,
    currentUser,
    chatHistory,
    onlineUsers,
    setCurrentChat,
    selectedIndex,
    setSelectedIndex,
    notification,
    setOpenConvo,
  } = props;

  const member = room.members.find(
    (members) => members._id !== currentUser!._id
  );
  const activeStatus = onlineUsers.some((u) => u._id === member!._id);

  function multiTask(index: number, room: Rooms) {
    setSelectedIndex(index);
    setCurrentChat(room);
    setOpenConvo(true);
  }

  return (
    <ListGroup.Item
      id="convo"
      action
      active={index === selectedIndex}
      onClick={() => multiTask(index, room)}
    >
      <div className="d-flex">
        <React.Fragment>
          <div className="onlineIconConvo">
            <img
              src={member!.image}
              className="roundpic"
              alt=""
              width={37}
              height={37}
            />
          </div>
          {activeStatus === true ? (
            <div className="onlineBadgeConvo">
              <img
                src="https://img.icons8.com/ios-filled/50/26e07f/new-moon.png"
                width={10}
                height={10}
                alt=""
              />
            </div>
          ) : null}
        </React.Fragment>
        <div className="ml-2">
          <div className="dmUserName">{member!.userName}</div>
          <div className="textHolder">
            {chatHistory.map((message, i) => (
              <React.Fragment key={i}>
                {room!._id === message!.roomId && (
                  <React.Fragment>
                    {i === chatHistory.length - 1 && (
                      <p key={i} className="text-light msgtext">
                        {message.text}
                      </p>
                    )}
                  </React.Fragment>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        {notification &&
          chatHistory.some((msg) => msg.sender === member!._id) && (
            <div className="ml-auto">
              <img
                src="https://img.icons8.com/ios-glyphs/50/ffffff/new.png"
                alt=""
                width="25px"
              />
            </div>
          )}
      </div>
    </ListGroup.Item>
  );
}

interface ConvoProps {
  convoId: string;
  socket: Socket;
  conversation: Rooms[];
  setConversation: any;
}

export const DeleteConversations: React.FC<ConvoProps> = ({
  convoId,
  socket,
  conversation,
  setConversation,
}) => {
  async function deleteConversations(roomId: string) {
    try {
      await API.delete(`/messages/${roomId}`);

      const newConvo = conversation.filter((convo) => convo._id !== convoId);
      setConversation(newConvo);
      socket.emit("deleteConversation");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <React.Fragment>
      <Dropdown
        className="dropdowntext ml-auto"
        style={{ top: "auto", zIndex: 100, bottom: "45px" }}
      >
        <Dropdown.Toggle className="btn btn-dark dropdownbtn">
          <div className="text-muted dots">
            <b>
              <strong>•••</strong>
            </b>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdownmenu">
          {
            <>
              <div className="d-flex customLinks">
                <div className="mr-3">
                  <img
                    alt=""
                    className="lrdimg"
                    width="17px"
                    src="https://img.icons8.com/fluency/50/000000/delete-sign.png"
                  />
                </div>
                <div onClick={() => deleteConversations(convoId)}>delete</div>
              </div>
            </>
          }
        </Dropdown.Menu>
      </Dropdown>
    </React.Fragment>
  );
};

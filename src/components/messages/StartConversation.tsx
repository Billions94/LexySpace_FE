import React from "react";
import { Button, Modal, Image } from "react-bootstrap";
import { Socket } from "socket.io-client";
import { defaultAvatar } from "../../assets/icons";
import { OnlineUser } from "../../interfaces/OnlineUser";
import API from "../../lib/API";
import { Rooms, User } from "../../redux/interfaces";

interface Props {
  onlineUsers: OnlineUser[];
  currentUser: User;
  room: Rooms | null;
  setCurrentChat: any;
  socket: Socket;
  setConversation: React.Dispatch<React.SetStateAction<Rooms[]>>;
  setOpenConvo: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StartConversation: React.FC<Props> = ({
  onlineUsers,
  currentUser,
  setCurrentChat,
  room,
  socket,
  setConversation,
  setOpenConvo,
}) => {
  const [show, setShow] = React.useState(false);
  const [users, setUsers] = React.useState<User[]>([]);

  const handleShow = () => {
    setShow(!show);
    getUsers();
  };

  async function getUsers() {
    try {
      const { data } = await API.get("/users");
      if (data) {
        console.log(data);
        setUsers(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const newConversation = async (otherUser: OnlineUser) => {
    try {
      const { data } = await API.post("/rooms", {
        senderId: currentUser._id,
        receiverId: otherUser._id,
      });
      if (data) {
        const newDT: Rooms = data[0];
        setCurrentChat(newDT);

        socket.emit("startConversation");
        setConversation((prev) => [...prev, data]);

        setShow(false);
        setOpenConvo(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Modal
        id="likesModal"
        show={show}
        size="sm"
        centered
        onHide={() => setShow(false)}
        style={{ borderRadius: "20px" }}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <span style={{ textAlign: "center" }}>New conversation</span>
        </Modal.Header>
        <Modal.Body>
          {show === true &&
            users &&
            users
              .filter((user) => user.userName !== currentUser.userName)
              .map((user, idx) => (
                <div
                  className="d-flex mb-3"
                  key={idx}
                  style={{ cursor: "pointer" }}
                  onClick={() => newConversation(user as any as OnlineUser)}
                >
                  <div>
                    <Image
                      roundedCircle
                      src={user.image ? user.image : defaultAvatar}
                      alt=""
                      width={37}
                      height={37}
                    />
                  </div>

                  <div className="ml-2 mt-2">
                    <strong style={{ color: "#e8e8e8" }}>
                      {user.userName}
                    </strong>
                    <span>{""}</span>
                  </div>
                </div>
              ))}
        </Modal.Body>
      </Modal>
      <div>
        {!show && (
          <Button size="sm" onClick={handleShow}>
            <span>{show ? "Close" : "Start convo"}</span>
          </Button>
        )}
      </div>
    </React.Fragment>
  );
};

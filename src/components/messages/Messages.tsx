import {
  Container,
  Row,
  Col,
  Form,
  ListGroup,
  Image,
  Button,
} from 'react-bootstrap';
import {
  useState,
  useEffect,
  FormEvent,
  useMemo,
  createRef,
  KeyboardEvent,
  useCallback,
} from 'react';
import { io } from 'socket.io-client';
import { OnlineUser } from '../../interfaces/OnlineUser';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Message, ReduxState, Rooms } from '../../redux/interfaces';
import { isTypingGif, conversationGif } from '../../assets/icons';
import { MessageBody } from './MessageBody';
import { debounce } from 'lodash';
import Convo, { DeleteConversations } from './Conversation';
import useAuthGuard from '../../lib/index';
import API from '../../lib/API';
import OnlineUsers from './OnlineUsers';
import { StartConversation } from './StartConversation';
import './styles.scss';
import React from 'react';
import { setDynamicId } from '../../redux/actions';

const ioAddress = String(process.env.REACT_APP_IO_URL);

const Messages = () => {
  useAuthGuard();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { user } = useSelector((state: ReduxState) => state.data);
  const me = user?.id;
  const [notification, setNotification] = useState<boolean>(false);

  const [username, setUsername] = useState<string>('');
  const [media, setMedia] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);

  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [message, setMessage] = useState('');
  const [currentChat, setCurrentChat] = useState<Rooms | null>(null);

  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [conversation, setConversation] = useState<Rooms[]>([]);

  const [arrivalMessage, setArrivalMessage] = useState<any | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const scrollRef = createRef<HTMLDivElement>();

  const [openConvo, setOpenConvo] = useState(false);

  const socket = useMemo(() => {
    return io(ioAddress, { transports: ['websocket'] });
  }, []);

  const handleIsTyping = useCallback(
    debounce((value) => {
      setIsTyping(value);
    }, 500),
    []
  );

  const getConversation = async () => {
    try {
      const { data } = await API.get<Rooms[]>(`/rooms/${me}`);
      setConversation(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(setDynamicId(id));
  }, [id]);

  useEffect(() => {
    (async () => await getConversation())();
  }, [me, conversation.length]);

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat?._id !== undefined) {
        try {
          const { data } = await API.get<Message[]>(
            `/messages/${currentChat?._id}`
          );
          if (data) {
            setChatHistory(data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    (async () => await getMessages())();
  }, [currentChat]);

  useEffect(() => {
    // dispatch(getUsersAction());
    setUsername(user!.username);
  }, [currentChat]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connection established!');
    });

    socket.on('getUsers', (users: OnlineUser[]) => {
      setOnlineUsers(users);
    });

    socket.on('startConversation', async () => {
      console.log('Conversation started!');
      await getConversation();
    });

    socket.on('deleteConversation', async () => {
      console.log('Conversation deleted!');
      await getConversation();
    });

    socket.on('typing', () => {
      setIsTyping(true);
      handleIsTyping(false);
    });

    socket.on('message', (newMessage) => {
      setNotification(true);
      setArrivalMessage(newMessage.message);
      setChatHistory((chatHistory) => [...chatHistory, newMessage.message]);
    });

    return () => {
      socket.on('disconnect', () => {
        (async () => await fetchOnlineUsers())();
      });
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setChatHistory((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    username &&
      socket.emit('setUsername', {
        userId: me,
        userName: username,
        image: user.image,
      });
  }, [username]);

  const handleMessageSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const receiver = currentChat?.members.find((m) => m.id !== me);

    const newMessage: Message = {
      roomId: currentChat?._id,
      text: message,
      sender: me,
      receiver: receiver?.id,
      image: user.image,
      media: media,
      createdAt: Date.now(),
    };

    socket.emit('sendmessage', { message: newMessage });

    try {
      const { data } = await API.post(`/messages`, newMessage);
      if (data) {
        setChatHistory((chatHistory) => [...chatHistory, data]);
        setMessage('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => await fetchOnlineUsers())();
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const fetchOnlineUsers = async () => {
    try {
      await API.get('/online-users');
    } catch (error) {
      console.log(error);
    }
  };

  const target = (e: any) => {
    if (e.target && e.target.files[0]) {
      setMedia(e.target.files[0]);
    }
  };

  const inputBtn = createRef<HTMLInputElement>();

  const openInputFile = () => {
    inputBtn?.current?.click();
  };

  // Getting the exact user to display their info on the message header
  const singleMsg = chatHistory.find((m) => m.receiver === undefined);
  const actualRoom = conversation?.find((r) => r._id === singleMsg?.roomId);
  const receiver = actualRoom?.members.find((m) => m.id !== me);
  // Check the current User typing
  const typer = chatHistory && chatHistory.find((m) => m.sender !== user?.id);

  const handleKeyboardEvent = async (e: KeyboardEvent<HTMLInputElement>) => {
    socket.emit('typing');

    if (e.key === 'Enter') {
      await handleMessageSubmit(e);
    }
  };

  console.log('the current room ', { currentChat });

  return (
    <Container fluid className="customRowDm p-0">
      <Row id="dmContainer" className="mx-auto p-0 customDmRow">
        <Col className="customCol1 ml-auto" sm={5} md={3} lg={3}>
          <div className="d-flex customMess">
            <h3 className="dmUserName mt-2 ml-2">{user.username}</h3>
          </div>

          <div id="input-container" className="panel-body"></div>

          <OnlineUsers
            onlineUsers={onlineUsers}
            currentUser={user}
            conversation={conversation}
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
            setConversation={setConversation}
            socket={socket}
            setOpenConvo={setOpenConvo}
          />

          <div style={{ borderBottom: '1px solid #24224a' }}>
            <div className="conversations d-flex">
              <div className="convoNfc">
                Conversations
                <Button className="text-dark btnXX">
                  <span>{conversation.length}</span>
                </Button>
              </div>
              <div className="ml-auto">
                <img src={conversationGif} alt="" width="25px" />
              </div>
            </div>
          </div>

          <ListGroup variant={'flush'} className="listofDM position-relative">
            {conversation &&
              conversation.map((room, i) => (
                <ListGroup.Item key={room._id} className="customList">
                  <Convo
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    index={i}
                    room={room}
                    currentUser={user}
                    onlineUsers={onlineUsers}
                    currentChat={currentChat}
                    chatHistory={chatHistory}
                    setCurrentChat={setCurrentChat}
                    notification={notification}
                    setOpenConvo={setOpenConvo}
                  />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      left: 'auto',
                      zIndex: '100',
                    }}
                  >
                    <DeleteConversations
                      convoId={room._id}
                      socket={socket}
                      conversation={conversation}
                      setConversation={setConversation}
                    />
                  </div>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>

        <Col className="mr-auto customCol2" sm={7} md={6} lg={5}>
          {!receiver ? null : (
            <div className="dmHeader1 d-flex">
              <img
                src={receiver?.image}
                onClick={() => navigate(`/userProfile/${receiver.id}`)}
                style={{ cursor: 'pointer' }}
                className="roundpic"
                alt=""
                width={37}
                height={37}
              />
              <div className="ml-2 dmUserName">
                <span style={{ cursor: 'default' }}>{receiver?.username}</span>
              </div>
            </div>
          )}

          {!openConvo ? (
            <div className="d-flex beforeConvo position-relative">
              <div className="text-muted px-3 mb-5">
                <span className="noMessages">Start a new conversation :)</span>
              </div>
              <div className="position-absolute mt-5 ml-2">
                <StartConversation
                  onlineUsers={onlineUsers}
                  currentUser={user}
                  room={currentChat}
                  setCurrentChat={setCurrentChat}
                  socket={socket}
                  setConversation={setConversation}
                  setOpenConvo={setOpenConvo}
                />
              </div>
            </div>
          ) : (
            <div className="messageBody">
              <div className="customDmBody  pt-2">
                {chatHistory.map((message, i) => (
                  <div ref={scrollRef} key={message.image} className="d-flex">
                    <MessageBody user={user} message={message} />
                  </div>
                ))}
              </div>

              {isTyping && (
                <div className="mb-2 ml-2">
                  <Image
                    roundedCircle
                    src={typer?.image}
                    alt=""
                    width="30px"
                    height="30px"
                  />
                  <Image src={isTypingGif} alt="" width="50px" height="30px" />
                </div>
              )}

              <div className="textAreaDm">
                <div id="textArea-container" className="panel-body">
                  <svg
                    id="input-icon1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="10px"
                    height="10px"
                    fill="#f91880"
                    className="bi bi-emoji-smile ml-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                  </svg>
                  {/* <img  id='input-icon' onClick={openInputFile} className="btn btn-sm uploadicons"
                        src="https://img.icons8.com/wired/50/000000/picture.png" alt='' width='50px'/> */}
                  <div>
                    {!message ? (
                      <div>
                        <input
                          type="file"
                          ref={inputBtn}
                          className="d-none"
                          onChange={target}
                        />
                        <svg
                          id="input-icon"
                          onClick={openInputFile}
                          xmlns="http://www.w3.org/2000/svg"
                          width="50px"
                          height="18"
                          fill="#f91880"
                          className="bi bi-card-image btn btn-sm uploadicons"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                          <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                        </svg>
                      </div>
                    ) : (
                      <button
                        className="btn ml-auto btn-sm sendBtnDm"
                        onClick={(e) => handleMessageSubmit(e)}
                      >
                        <i className="fa fa-pencil fa-fw" /> send
                      </button>
                    )}
                  </div>
                  <Form.Control
                    className="form-control dmText search"
                    placeholder="Message..."
                    value={message}
                    onClick={() => setNotification(false)}
                    onKeyPress={handleKeyboardEvent}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Messages;

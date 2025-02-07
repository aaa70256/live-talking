import './App.css'
import socket from "./server/socket";
import { useEffect, useState } from "react";
import ChatRoom from "./Components/user-chat-room";
import Room from "./Components/user-room";
import UserName from "./Components/user-name-input";
import { RoomProvider } from "./untils/RoomContext";


function App() {
  const [room, setRoom] = useState("");

  const [message, setMessage] = useState("");
  const [messageReceive, setMessageReceive] = useState("");
  const [show, setShow] = useState(true);
  const [userNameShow, setUserNameShow] = useState(true);
  const [userName, setUserName] = useState('');


  const setShowHandler = (value) => {
    setShow(value)
  }

  const setShowUserName = (value) => {
    setUserNameShow(value)
  }

  const setUserNameHandler = (value) => {
    setUserName(value)
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceive(data.message)
    })
  }, [socket])
  return (
    <>
      <div>
        <RoomProvider>
          {userNameShow && <UserName showUserName={setShowUserName} setUserNameHandler={setUserNameHandler} />}
          {show && !userNameShow && <Room showWhat={setShowHandler} userName={userName} />}
          {!show && <ChatRoom userName={userName} />}
        </RoomProvider>
      </div>
    </>
  )
}

export default App

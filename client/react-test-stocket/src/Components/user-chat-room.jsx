import { useEffect, useState, useContext } from "react";
import UserMessageInput from "./user-message-input";
import socket from "../server/socket";
import RoomContext from "../untils/RoomContext";
import '../style/user-chat-room.scss'



function ChatRoom({ userName }) {

  const { room, message } = useContext(RoomContext);
  const [messageReceive, setMessageReceive] = useState([]);


  useEffect(() => {
    const messageHandler = (data) => {
      setMessageReceive((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), text: data.message, receive: true, userName: data.userName },
      ]);
    };

    socket.on("receive_message", messageHandler);

    return () => {
      socket.off("receive_message", messageHandler)
    };
  }, [socket])

  useEffect(() => {
    setMessageReceive((prevMessages) => [
      ...prevMessages,
      { id: Date.now(), text: message, receive: false, userName: userName },
    ]);
  }, [message])

  return (
    <>
      <h1>{room}</h1>
      <div className="text_area">{
        messageReceive.map(item => {
          if (item.receive == true) {
            return <><p className="text_style receive_text" key={item.id}><span>{item.userName}:</span><span>{item.text}</span></p></>
          } else {
            return <><p className="text_style post_text" key={item.id}>{item.text}</p></>
          }
        })
      }</div>
      <UserMessageInput userName={userName} />
    </>
  )
}

export default ChatRoom
import './App.css'
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [room, setRoom] = useState("");

  const [message, setMessage] = useState("");
  const [messageReceive, setMessageReceive] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message, room })
  }
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room)
    }
  }
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceive(data.message)
    })
  }, [socket])
  return (
    <>
      <div>
        <input type="text" placeholder='Room Number...' onChange={(e) => { setRoom(e.target.value) }} />
        <button onClick={joinRoom}>join Room</button><br /><br />
        <input type="text" placeholder='Message...' onChange={(e) => { setMessage(e.target.value) }} />
        <button onClick={sendMessage}>Send Message</button>
        <h1>Message:</h1>
        {messageReceive}
      </div>
    </>
  )
}

export default App

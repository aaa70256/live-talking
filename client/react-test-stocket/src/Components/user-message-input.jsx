import { useEffect, useState, useContext } from "react";
import RoomContext from "../untils/RoomContext";
import socket from "../server/socket";
import '../style/user-message-input.scss'


function UserMessageInput({ userName }) {

  const { room, setMessage } = useContext(RoomContext);
  const [userInput, setUserInput] = useState("");



  const sendMessage = () => {
    socket.emit("submit_text", { message: userInput, room, userName })
    setMessage(userInput)
    setUserInput('')
  }

  return (
    <>
      <div className="input_area">
        <input
          placeholder='請輸入訊息'
          variant="standard"
          className="user_input"
          size="small"
          value={userInput}
          onChange={(e) => { setUserInput(e.target.value) }} />
        <button variant="contained" className="user_submit" onClick={sendMessage}>送出</button>
      </div>
    </>
  )
}

export default UserMessageInput
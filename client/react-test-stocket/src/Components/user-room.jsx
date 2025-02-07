import { useEffect, useState, useContext } from "react";
import socket from "../server/socket";
import RoomContext from "../untils/RoomContext";
import '../style/user-room.scss'


function Room({ showWhat, userName }) {

  const { setRoom } = useContext(RoomContext);

  const joinRoom = (value) => {
    socket.emit("join_room", value)
    setRoom(value)
    showWhat(false)
  }

  return (
    <>
      <div className="button_group">
        <p>{userName} 您好，請選擇欲加入的聊天室 !</p>
        <button variant="contained" className="button_style" onClick={() => joinRoom('放鬆聊天室')}>放鬆聊天室</button>
        <button variant="contained" className="button_style" color="secondary" onClick={() => joinRoom('會議討論區')}>會議討論區</button>
        <button variant="contained" className="button_style" color="success" onClick={() => joinRoom('遊戲競賽區')}>遊戲競賽區</button>
        <button variant="contained" className="button_style" color="info" onClick={() => joinRoom('音樂大廳')}>音樂大廳</button>
        <button variant="contained" className="button_style" color="warning" onClick={() => joinRoom('主管討論區')}>管理討論區</button>
      </div>
    </>
  )
}

export default Room
import React, { createContext, useState } from "react";

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");



  return (
    <RoomContext.Provider value={{ room, setRoom, message, setMessage }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomContext;
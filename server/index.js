const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io')
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    //origin port需要寫你前端再跑的port
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  }
});

io.on("connection", (socket) => {
  console.log(`User Connect:${socket.id}`);
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data)
  })
  socket.on("join_room", (data) => {
    socket.join(data)
  })
})
server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
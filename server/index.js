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
    //如果需要用區網測試可以將localhost改成你自己的ip
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  }
});

io.on("connection", (socket) => {
  console.log(`User Connect:${socket.id}`);
  socket.on("submit_text", (data) => {
    socket.to(data.room).emit("receive_message", data)
  })
  socket.on("join_room", (data) => {
    socket.join(data)
  })
})
server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
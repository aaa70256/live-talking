import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3001");
//如果需要用區域網路測試，可將連接網址改成你自己IP，但port不要跟server重複

export default socket;
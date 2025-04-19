// socket.js

import { SOCKET_URL } from "@/constants";
import { io } from "socket.io-client";

const socket = io(SOCKET_URL, {
  transports: ["websocket"], // improves compatibility
});

export default socket;

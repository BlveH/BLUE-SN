import app from "./src/app.mjs";
import "dotenv/config";
import * as Http from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 3000;

const server = Http.createServer(app);
const io = new Server(server);

const userList = [];
const userListId = [];

io.on("connection", (socket) => {
  socket.on("client-send-data", (data) => {
    if (userList.indexOf(data) >= 0) {
      socket.emit("server-send-fail");
    } else {
      userList.push(data);
      socket.Username = data;
      socket.emit("server-send-success", data);
      io.sockets.emit("server-send-listUser", userList);
    }
  });

  socket.emit("users-online", userListId);

  socket.on("new-peerId", (peerId) => {
    socket.peerId = peerId;
    userListId.push(peerId);
    io.sockets.emit("new-user-connect", userListId);
  });

  socket.on("disconnect", () => {
    const index = userList.indexOf(socket.peerId);
    userList.splice(index, 1);
    io.sockets.emit("user-disconnect", socket.peerId);
  });

  socket.on("user-focus-in", () => {
    socket.broadcast.emit("user-is-writing", socket.peerId + "...");
  });

  socket.on("user-focus-out", () => {
    socket.broadcast.emit("user-stop-writing");
  });

  socket.on("user-send-message", (data) => {
    io.sockets.emit("server-send-message", {
      user: socket.peerId,
      content: data,
    });
  });
});

server.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log("Exit"));
});

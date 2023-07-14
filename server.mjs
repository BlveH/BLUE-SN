import app from "./src/app.mjs";
import "dotenv/config";
import * as Http from "http";
import { Server } from "socket.io";
import user from "./src/models/user.model.mjs";

const PORT = process.env.PORT || 3000;

const server = Http.createServer(app);
const io = new Server(server);

const userListId = [];

io.on("connection", (socket) => {
  socket.on("client-register", async (name, password, verifyPassword) => {
    const userFound = await user.findOne({ username: name });
    if (userFound) {
      socket.emit("server-send-fail");
    } else {
      if (password !== verifyPassword) {
        socket.emit("server-send-fail-pass");
      } else {
        const newUser = await user.create({
          username: name,
          password: verifyPassword,
        });
        socket.Username = name;
        socket.emit("server-send-regist-success", newUser);
      }
    }
  });
  socket.on("client-send-data", async (name, password) => {
    const userFound = await user.findOne({ username: name });
    if (!userFound) {
      socket.emit("server-login-fail");
    } else {
      if (password !== userFound.password) {
        socket.emit("server-login-fail-pass");
      } else {
        socket.emit("server-send-success", userFound);
      }
    }
  });

  socket.emit("users-online", userListId);

  socket.on("new-peerId", (peerId) => {
    socket.peerId = peerId;
    userListId.push(peerId);
    io.sockets.emit("new-user-connect", userListId);
  });

  socket.on("disconnect", () => {
    const index = userListId.indexOf(socket.peerId);
    userListId.splice(index, 1);
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

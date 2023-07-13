import app from "./src/app.mjs";
import "dotenv/config";
import * as Http from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 3000;

const server = Http.createServer(app);
const io = new Server(server);
const listUsers = [];

// io.on("connection", (socket) => {
//   console.log("Someone is connecting", socket.id);
//   socket.on("client-send-data", (data) => {
//     if (listUsers.indexOf(data) >= 0) {
//       socket.emit("server-send-fail");
//     } else {
//       listUsers.push(data);
//       socket.Username = data;
//       socket.emit("server-send-success", data);
//       io.sockets.emit("server-send-listUser", listUsers);
//     }
//   });

//   socket.on("user-send-message", (data) => {
//     io.sockets.emit("server-send-message", {
//       user: socket.Username,
//       content: data,
//     });
//   });

//   socket.on("user-focus-in", () => {
//     socket.broadcast.emit("user-is-writing", socket.Username + "...");
//   });

//   socket.on("user-focus-out", () => {
//     socket.broadcast.emit("user-stop-writing");
//   });

//   socket.on("client-logout", () => {
//     listUsers.splice(listUsers.indexOf(socket.Username), 1);
//     socket.broadcast.emit("server-send-listUser", listUsers);
//   });

//   socket.on("disconnect", () => {
//     console.log(socket.id, "is off");
//   });
// });

server.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log("Exit"));
});

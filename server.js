import app from "./src/app.js";
import "dotenv/config";
import * as Http from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 3000;

const server = Http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Someone is connecting", socket.id);
  socket.on("click-send-data", (data) => {
    console.log(data);
    io.sockets.emit("server-send-data", data);
  });
  socket.on("disconnect", () => {
    console.log(socket.id, "is off");
  });
});

server.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log("Exit"));
});

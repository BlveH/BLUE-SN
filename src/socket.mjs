import openCamera from "./openCamera.mjs";

const socketFeature = () => {
  const socket = io("http://localhost:3000");
  socket.on("server-send-data", (data) => {
    document.getElementById("data").innerHTML += data;
  });

  socket.on("server-send-fail", () => {
    alert("User has existed");
  });

  socket.on("server-send-listUser", (data) => {
    document.getElementById("boxContent").innerHTML = "";
    data.forEach((index) => {
      const userDiv = document.createElement("div");
      userDiv.classList.add("user");
      userDiv.innerHTML = index;
      document.getElementById("boxContent").appendChild(userDiv);
    });
  });

  socket.on("server-send-success", (data) => {
    document.getElementById("currentUser").innerHTML = data;
    document.getElementById("login").style.display = "none";
    document.getElementById("chat").style.display = "block";
  });

  socket.on("user-is-writing", (data) => {
    document.getElementById("noti").innerHTML = data;
  });

  socket.on("user-stop-writing", () => {
    document.getElementById("noti").innerHTML = "";
  });

  socket.on("server-send-message", (data) => {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.innerHTML = data.user + ":" + data.content;
    document.getElementById("listMessage").appendChild(messageDiv);
  });

  document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("login").style.display = "block";
    document.getElementById("chat").style.display = "none";

    document.getElementById("btnRegister").addEventListener("click", () => {
      socket.emit(
        "client-send-data",
        document.getElementById("txtUsername").value
      );
    });

    openCamera();

    document.getElementById("btnLogout").addEventListener("click", () => {
      socket.emit("client-logout");
      document.getElementById("chat").style.display = "none";
      document.getElementById("login").style.display = "block";
    });

    document.getElementById("btnSendMessage").addEventListener("click", () => {
      socket.emit(
        "user-send-message",
        document.getElementById("txtMessage").value
      );
    });

    document.getElementById("txtMessage").addEventListener("focusin", () => {
      socket.emit("user-focus-in");
    });

    document.getElementById("txtMessage").addEventListener("focusout", () => {
      socket.emit("user-focus-out");
    });
  });
};

export default socketFeature;

import openCamera from "./openCamera.mjs";
import Peer from "peerjs";
import { uid } from "uid";
import playVideo from "./playVideo.mjs";
import io from "socket.io-client";

const socket = io(process.env.SOCKET_SERVER_URL);

const getUid = () => {
  const id = uid(10);
  document.getElementById("peerId").innerHTML += id;

  return id;
};

const peerID = getUid();

const peer = new Peer(peerID);
socket.emit("new-peerId", peerID);

// socket.on("server-send-success", (data) => {
//   document.getElementById("login").style.display = "none";
//   document.getElementById("chat").style.display = "block";
// });

// socket.on("server-send-fail", () => {
//   alert("User has existed");
// });

document
  .getElementById("list-user")
  .addEventListener("click", function (event) {
    const peerId = event.target.textContent;
    openCamera((stream) => {
      playVideo(stream, "localVideo");
      const call = peer.call(peerId, stream);
      call.on("stream", (remoteStream) => {
        playVideo(remoteStream, "friendVideo");
      });
    });
  });

peer.on("call", (call) => {
  openCamera((stream) => {
    playVideo(stream, "localVideo");
    call.answer(stream);
    call.on("stream", (remoteStream) => {
      playVideo(remoteStream, "friendVideo");
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  //   document.getElementById("login").style.display = "block";
  //   document.getElementById("chat").style.display = "none";

  //   document.getElementById("btnRegister").addEventListener("click", () => {
  //     socket.emit(
  //       "client-send-data",
  //       document.getElementById("txtUsername").value
  //     );
  //   });

  socket.on("users-online", (userList) => {
    let listUser = document.getElementById("list-user");
    listUser.innerHTML = "";
    userList.forEach((element) => {
      let li = document.createElement("li");
      li.textContent = element;
      li.id = element;
      listUser.appendChild(li);
    });
  });

  socket.on("new-user-connect", (userList) => {
    let listUser = document.getElementById("list-user");
    userList.forEach((element) => {
      if (!document.getElementById(element)) {
        let li = document.createElement("li");
        li.textContent = element;
        li.id = element;

        listUser.appendChild(li);
      }
    });
  });

  socket.on("user-disconnect", (peerId) => {
    const element = document.getElementById(peerId);
    if (element) {
      element.parentNode.removeChild(element);
    }
  });
  document.getElementById("txtMessage").addEventListener("focusin", () => {
    socket.emit("user-focus-in");
  });

  document.getElementById("txtMessage").addEventListener("focusout", () => {
    socket.emit("user-focus-out");
  });
  socket.on("user-is-writing", (data) => {
    document.getElementById("noti").innerHTML = data;
  });

  socket.on("user-stop-writing", () => {
    document.getElementById("noti").innerHTML = "";
  });
  document.getElementById("btnSendMessage").addEventListener("click", () => {
    const messageInput = document.getElementById("txtMessage");
    const message = messageInput.value;

    socket.emit("user-send-message", message);

    messageInput.value = "";
  });

  socket.on("server-send-message", (data) => {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.innerHTML = data.user + ":" + data.content;
    document.getElementById("listMessage").appendChild(messageDiv);
  });
});

const listUser = document.getElementById("list-user");

listUser.addEventListener("mouseover", function (event) {
  if (event.target.tagName === "LI") {
    event.target.style.cursor = "pointer";
  }
});

listUser.addEventListener("mouseout", function (event) {
  if (event.target.tagName === "LI") {
    event.target.style.cursor = "default";
  }
});

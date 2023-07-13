import socketFeature from "./socket.mjs";
import openCamera from "./openCamera.mjs";
import Peer from "peerjs";
import { uid } from "uid";
import playVideo from "./playVideo.mjs";

const getUid = () => {
  const id = uid(10);
  document.getElementById("peerId").innerHTML += id;

  return id;
};

let customConfig;

const xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  "https://service.xirsys.com/ice?ident=BLUEZoNeH&secret=8fbc6b68-211a-11ee-a78d-0242ac130003&domain=global.xirsys.net&application=default&room=default&secure=1",
  false
);

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    const customConfig = data.d;
    console.log("" + customConfig);
  }
};

xhr.send();

const peer = new Peer(getUid());

peer.on("open", function () {
  console.log("PeerJS connection open");
});

peer.on("error", function (err) {
  console.log("PeerJS error: " + err);
});

document.getElementById("btnConnect").addEventListener("click", () => {
  const friendId = document.getElementById("txtFriendId").value;
  openCamera((stream) => {
    playVideo(stream, "localVideo");
    const call = peer.call(friendId, stream);
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

// socketFeature();

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
const peer = Peer(getUid(), {
  host: "blue-sn-b5bea4ea9ff8.herokuapp.com/",
  port: 443,
  secure: true,
  key: "peerjs",
});

document.getElementById("btnConnect").addEventListener("click", function () {
  const friendId = document.getElementById("txtFriendId").value;
  openCamera(function (stream) {
    playVideo(stream, "localVideo");
    const call = peer.call(friendId, stream);
    call.on("stream", function (remoteStream) {
      playVideo(remoteStream, "friendVideo");
    });
  });
});

peer.on("call", function (call) {
  openCamera(function (stream) {
    playVideo(stream, "localVideo");
    call.answer(stream);
    call.on("stream", function (remoteStream) {
      playVideo(remoteStream, "friendVideo");
    });
  });
});

// socketFeature();

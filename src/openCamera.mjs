import Peer from "simple-peer";
import playVideo from "./playVideo.mjs";

const openCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    playVideo(stream, "localVideo");
    const peer = new Peer({
      initiator: location.hash === "#1",
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (token) => {
      document.getElementById("txtMySignal").value = JSON.stringify(token);
    });

    document.getElementById("btnConnect").addEventListener("click", () => {
      const friendSignal = JSON.parse(
        document.getElementById("txtFriendSignal").value
      );
      peer.signal(friendSignal);
    });

    peer.on("stream", (friendStream) => {
      playVideo(friendStream, "friendVideo");
    });
  } catch (err) {
    console.log(err);
  }
};

export default openCamera;

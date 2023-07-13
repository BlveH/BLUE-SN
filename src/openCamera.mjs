import peerFeature from "./peerFeature.mjs";

const openCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    peerFeature(stream);
  } catch (err) {
    console.log(err);
  }
};

export default openCamera;

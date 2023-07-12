const openCamera = async () => {
  const video = document.getElementById("localVideo");

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();
    };
  } catch (err) {
    console.log(err);
  }
};

export default openCamera;

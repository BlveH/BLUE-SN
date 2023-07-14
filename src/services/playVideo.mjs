const playVideo = (stream, idVideo) => {
  const video = document.getElementById(idVideo);
  video.srcObject = stream;

  // Lấy track video từ stream
  video.onloadedmetadata = () => {
    video.style.transform = "scaleX(-1)";
    video.play();
  };
};

export default playVideo;

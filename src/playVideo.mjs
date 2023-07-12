const playVideo = (stream, idVideo) => {
  const video = document.getElementById(idVideo);
  video.srcObject = stream;

  video.onloadedmetadata = () => {
    video.play();
  };
};

export default playVideo;

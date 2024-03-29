const openCamera = async (callback) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
      },
      video: {
        facingMode: "user",
      },
    });
    // Lấy track âm thanh từ stream
    const audioTrack = stream.getAudioTracks()[0];
    if (audioTrack) {
      // Bật chế độ hủy tiếng vọng
      audioTrack.echoCancellation = true;
    }
    callback(stream);
  } catch (err) {
    console.log(err);
  }
};

export default openCamera;

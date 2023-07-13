const openCamera = async (obj) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    obj(stream);
  } catch (err) {
    console.log(err);
  }
};

export default openCamera;

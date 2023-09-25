document.addEventListener('DOMContentLoaded', () => {
  const videoElement = document.getElementById('video-preview');
  const startButton = document.getElementById('start-camera-button');

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoElement.srcObject = stream;
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  }

  startButton.addEventListener('click', () => {
    startCamera();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const videoElement = document.getElementById('video-preview');
  const startButton = document.getElementById('start-camera-button');
  const stopButton = document.getElementById('stop-camera-button');
  const cameraStatusElement = document.getElementById('camera-status');
  const brightnessSlider = document.getElementById('brightness-slider');
  const brightnessValueElement = document.getElementById('brightness-value');
  const hueSlider = document.getElementById('hue-slider');
  const hueValueElement = document.getElementById('hue-value');
  const saturationSlider = document.getElementById('saturation-slider');
  const saturationValueElement = document.getElementById('saturation-value');
  const resetFiltersButton = document.getElementById('reset-filters-button');

  let videoStream;

  const updateFilters = () => {
    const brightnessValue = brightnessSlider.value;
    const hueValue = hueSlider.value;
    const saturationValue = saturationSlider.value;

    videoElement.style.filter = `brightness(${brightnessValue}%) hue-rotate(${hueValue}deg) saturate(${saturationValue}%)`;

    brightnessValueElement.innerText = brightnessValue;
    hueValueElement.innerText = hueValue;
    saturationValueElement.innerText = saturationValue;
  };

  const startCamera = async () => {
    try {
      videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoElement.srcObject = videoStream;
      cameraStatusElement.innerText = 'Camera Status: ON';
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  };

  const stopCamera = () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      videoElement.srcObject = null;
      cameraStatusElement.innerText = 'Camera Status: OFF';
    }
  };

  const resetFilters = () => {
    brightnessSlider.value = 100;
    hueSlider.value = 0;
    saturationSlider.value = 100;
    updateFilters();
  };

  startButton.addEventListener('click', startCamera);
  stopButton.addEventListener('click', stopCamera);
  brightnessSlider.addEventListener('input', updateFilters);
  hueSlider.addEventListener('input', updateFilters);
  saturationSlider.addEventListener('input', updateFilters);
  resetFiltersButton.addEventListener('click', resetFilters);
});

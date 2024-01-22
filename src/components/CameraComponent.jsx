import React, { useRef, useState } from "react";
import "./CameraComponent.css"; // Import a separate CSS file for styling

const CameraComponent = () => {
  const videoRef = useRef(null);
  const [isFullScreen, setFullScreen] = useState(false);

  const startCamera = async () => {
    try {
      console.log("Trying to open camera");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setFullScreen(true); // Set full screen mode
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const takePhoto = () => {
    // Implement logic to capture a photo from the video stream
    console.log("Photo taken!");
  };

  return (
    <div className={`camera-container ${isFullScreen ? "fullscreen" : ""}`}>
      <button className="start-camera-button" onClick={startCamera}>
        Start Camera
      </button>
      <video ref={videoRef} autoPlay playsInline />
      {isFullScreen && (
        <button className="take-photo-button" onClick={takePhoto}>
          Take Photo
        </button>
      )}
    </div>
  );
};

export default CameraComponent;

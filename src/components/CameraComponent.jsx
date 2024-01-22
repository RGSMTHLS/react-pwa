import React, { useRef } from "react";
import "./CameraComponent.css";

const CameraComponent = () => {
  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      console.log("Trying to open camera");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setFullScreen(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const takePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/png");

    const downloadLink = document.createElement("a");
    downloadLink.href = dataUrl;
    downloadLink.download = "photo.png";

    document.body.appendChild(downloadLink);
    downloadLink.click();

    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <button
        className="start-camera-button active:scale-95 hover:bg-gray-700"
        onClick={startCamera}
      >
        Starta kamera
      </button>
      <video
        className="w-screen h-screen"
        ref={videoRef}
        autoPlay
        playsInline
      />
      <button className="take-photo-button" onClick={takePhoto}>
        Ta bild
      </button>
    </div>
  );
};

export default CameraComponent;

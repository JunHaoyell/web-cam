import React, { useRef, useCallback, useState, useEffect } from "react";
import Webcam from "react-webcam";

const CameraComponent = () => {
  const webcamRef = useRef(null);
  const frameRef = useRef(null);

  const [videoConstraints, setVideoConstraints] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    facingMode: "user",
  });

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    const frame = frameRef.current.getBoundingClientRect();
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      canvas.width = frame.width;
      canvas.height = frame.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        img,
        frame.left,
        frame.top,
        frame.width,
        frame.height,
        0,
        0,
        frame.width,
        frame.height
      );
      const croppedImageSrc = canvas.toDataURL("image/jpeg");
      console.log(croppedImageSrc);
    };
  }, [webcamRef]);

  useEffect(() => {
    const updateConstraints = () => {
      if (window.innerHeight > window.innerWidth) {
        // Portrait mode
        setVideoConstraints({
          width: window.innerWidth,
          height: window.innerHeight,
          facingMode: "user",
        });
      } else {
        // Landscape mode
        setVideoConstraints({
          width: window.innerWidth,
          height: window.innerHeight,
          facingMode: "user",
        });
      }
    };

    window.addEventListener("resize", updateConstraints);
    updateConstraints(); // Initial call

    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      {/* Top overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "25%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      />
      {/* Bottom overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "25%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      />
      {/* Left overlay */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: 0,
          width: "10%",
          height: "50%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      />
      {/* Right overlay */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          right: 0,
          width: "10%",
          height: "50%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      />
      {/* Frame */}
      <div
        ref={frameRef}
        style={{
          position: "absolute",
          top: "25%",
          left: "10%",
          width: "80%",
          height: "50%",
          border: "2px solid white",
          boxSizing: "border-box",
          zIndex: 2,
        }}
      />
      <button
        onClick={capture}
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: "#ffffff",
          color: "#000000",
          border: "none",
          borderRadius: "30px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          cursor: "pointer",
          zIndex: 3,
        }}
      >
        Take Photo
      </button>
    </div>
  );
};

export default CameraComponent;

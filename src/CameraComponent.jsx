// CameraComponent.jsx
import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";

const CameraComponent = () => {
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
  }, [webcamRef]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        height={720}
        videoConstraints={{
          width: 1280,
          height: 720,
          facingMode: "user",
        }}
      />
      <button onClick={capture}>Capture Photo</button>
    </div>
  );
};

export default CameraComponent;

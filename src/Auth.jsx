import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as faceapi from "face-api.js";

function Auth() {
  const videoRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
        await faceapi.nets.faceExpressionNet.loadFromUri("/models");
      } catch (error) {
        console.error("Error loading models:", error);
      }
    };

    const detectFaces = async () => {
      try {
        await startVideo();
        await loadModels();

        const id = setInterval(async () => {
          const detections = await faceapi
            .detectAllFaces(
              videoRef.current,
              new faceapi.TinyFaceDetectorOptions()
            )
            .withFaceLandmarks()
            .withFaceExpressions();

          // Check for neutral expression
          const neutralDetected = detections.some(
            (face) => face.expressions.neutral > 0.95
          );
          if (neutralDetected) {
            if (videoRef.current.srcObject) {
              const stream = videoRef.current.srcObject;
              const tracks = stream.getTracks();
              tracks.forEach((track) => track.stop());
            }
            clearInterval(id);
            navigate("/home"); // Navigate to home.jsx;
          }
        }, 100);

        // Cleanup function to clear interval when component unmounts
        return () => clearInterval(id);
      } catch (error) {
        console.error("Error detecting faces:", error);
      }
    };

    detectFaces();

    // Cleanup function to stop video stream when component unmounts
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-[100%] w-[100%]">
      <h2 className="text-3xl mt-8">Authentication Page</h2>
      <h3 className="text-xl mt-4">
        Look into the camera and wait for authentication
      </h3>
      <video ref={videoRef} autoPlay className="w-[600px] h-[600px]" />
    </div>
  );
}

export default Auth;

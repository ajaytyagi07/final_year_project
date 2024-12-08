import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Signup.module.css'
import * as faceapi from 'face-api.js';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const videoRef = useRef();
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [isFaceDetected, setIsFaceDetected] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state for better UX

    // Load face recognition models
    const loadModels = async () => {
        try {
            await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
            await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
            await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
            setIsModelLoaded(true);
            setLoading(false); // Models loaded, stop showing the loading spinner
            startVideo();
        } catch (error) {
            console.error('Error loading models:', error);
            setLoading(false);
            alert('Failed to load face recognition models.');
        }
    };

    // Start webcam
    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
            videoRef.current.srcObject = stream;
        } catch (error) {
            console.error('Error accessing webcam:', error);
            alert('Failed to access webcam.');
        }
    };

    // Handle Signup
    const handleSignup = async () => {
        const videoElement = videoRef.current;

        const detections = await faceapi.detectSingleFace(
            videoElement,
            new faceapi.TinyFaceDetectorOptions()
        ).withFaceLandmarks().withFaceDescriptor();

        if (detections) {
            const faceDescriptor = detections.descriptor;
            setIsFaceDetected(true); // Face detected successfully

            try {
                const response = await axios.post('http://localhost:5000/register', {
                    email,
                    descriptor: Array.from(faceDescriptor), // Convert face descriptor to array
                });

                alert(response.data.message);
            } catch (error) {
                console.error('Error during signup:', error);
                alert('Error during signup.');
            }
        } else {
            setIsFaceDetected(false); // No face detected
            alert('No face detected. Please try again.');
        }
    };

    useEffect(() => {
        loadModels();
    }, []);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Signup</h2>
            <div className={styles.inputContainer}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.inputField}
                />
            </div>
            <div className={styles.faceCaptureContainer}>
                <h3>Capture Face for Registration</h3>
                {loading ? (
                    <div>
                        <p className={styles.loadingText}>Loading face recognition model...</p>
                        <div className={styles.spinner}></div> {/* Spinner for loading */}
                    </div>
                ) : !isModelLoaded ? (
                    <p>Failed to load face recognition models.</p>
                ) : (
                    <div>
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            className={styles.video}
                        />

                        {!isFaceDetected && <p>Please ensure your face is clearly visible.</p>}
                    </div>
                )}
            </div>
            <button onClick={handleSignup} className={styles.registerButton}>
                Signup

            </button>
            <Link to='/login' className={styles.loginLink}>Click here if Already registered..</Link>
        </div>
    );
};

export default Signup;

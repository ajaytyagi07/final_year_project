import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Signup.module.css';
import * as faceapi from 'face-api.js';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const videoRef = useRef();
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [isFaceDetected, setIsFaceDetected] = useState(false);
    const [loading, setLoading] = useState(true);

    // Load face recognition models
    useEffect(() => {
        const loadModels = async () => {
            try {
                await Promise.all([
                    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
                    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
                    faceapi.nets.faceRecognitionNet.loadFromUri('/models')
                ]);
                setIsModelLoaded(true);
                setLoading(false);
                // startVideo();
            } catch (error) {
                console.error('Error loading models:', error);
                setLoading(false);
                alert('Failed to load face recognition models.');
            }
        };

        loadModels();
    }, []);

    useEffect(() => {
        if (isModelLoaded)
            startVideo();

    }, [isModelLoaded])

    // Start webcam when models are loaded
    const startVideo = async () => {
        if (!isModelLoaded) return;
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
        if (!email.trim()) {
            alert('Please enter your email.');
            return;
        }

        const videoElement = videoRef.current;
        const detections = await faceapi.detectSingleFace(
            videoElement,
            new faceapi.TinyFaceDetectorOptions()
        ).withFaceLandmarks().withFaceDescriptor();

        if (detections) {
            const faceDescriptor = Array.from(detections.descriptor); // Convert to an array
            setIsFaceDetected(true);

            try {
                const response = await axios.post('http://localhost:5000/api/register', {
                    email,
                    descriptor: JSON.stringify(faceDescriptor), // Convert descriptor to JSON string
                });

                alert(response.data.message);
            } catch (error) {
                console.error('Error during signup:', error);
                alert(error.response?.data?.message || 'Error during signup.');
            }
        } else {
            setIsFaceDetected(false);
            alert('No face detected. Please try again.');
        }
    };

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
                        <div className={styles.spinner}></div>
                    </div>
                ) : !isModelLoaded ? (
                    <p>Failed to load face recognition models.</p>
                ) : (
                    <div>
                        <video ref={videoRef} autoPlay muted className={styles.video} />
                        {!isFaceDetected && <p>Please ensure your face is clearly visible.</p>}
                    </div>
                )}
            </div>
            <button onClick={handleSignup} className={styles.registerButton}>
                Signup
            </button>
            <Link to="/login" className={styles.loginLink}>
                Click here if already registered
            </Link>
        </div>
    );
};

export default Signup;

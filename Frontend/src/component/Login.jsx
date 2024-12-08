import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import * as faceapi from 'face-api.js';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const videoRef = useRef();
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const navigate = useNavigate(); // For navigation to other routes
    const streamRef = useRef(null); // Store the stream reference for cleanup

    // Load face recognition models
    const loadModels = async () => {
        try {
            await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
            await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
            await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
            setIsModelLoaded(true);
            startVideo();
        } catch (error) {
            console.error('Error loading models:', error);
            alert('Failed to load face recognition models.');
        }
    };

    // Start webcam
    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
            streamRef.current = stream; // Store the stream reference
            videoRef.current.srcObject = stream;
        } catch (error) {
            console.error('Error accessing webcam:', error);
            alert('Failed to access webcam.');
        }
    };

    // Stop webcam when the component is unmounted
    const stopVideo = () => {
        if (streamRef.current) {
            const tracks = streamRef.current.getTracks();
            tracks.forEach(track => track.stop()); // Stop all video tracks
            streamRef.current = null; // Clear the reference after stopping the tracks
        }
    };

    // Handle Face Login
    const handleFaceLogin = async () => {
        const videoElement = videoRef.current;

        try {
            const detections = await faceapi.detectSingleFace(
                videoElement,
                new faceapi.TinyFaceDetectorOptions()
            ).withFaceLandmarks().withFaceDescriptor();

            if (detections) {
                const faceDescriptor = detections.descriptor;

                const response = await axios.post('http://localhost:5000/login', {
                    email,
                    descriptor: Array.from(faceDescriptor), // Send both email and face descriptor
                });

                if (response.data.success) {
                    alert('Login successful!');
                    navigate('/dashboard'); // Redirect to the dashboard after successful login
                } else {
                    alert('Face not recognized. Redirecting to registration.');
                    navigate('/register'); // Redirect to registration page if face is not recognized
                }
            } else {
                alert('No face detected. Please ensure your face is visible and try again.');
            }
        } catch (error) {
            console.error('Error during face login:', error);
            alert('Error during face login. Please try again.');
        }
    };

    useEffect(() => {
        loadModels();

        // Cleanup: stop video stream when the component is unmounted
        return () => {
            stopVideo();
        };
    }, []);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Login</h2>
            <div className={styles.inputContainer}>
                <h3>Enter your Email</h3>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.inputField}
                />
            </div>

            <div className={styles.faceLoginContainer}>
                <h3>Capture Face</h3>
                {isModelLoaded ? (
                    <div>
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            className={styles.video}
                        />
                    </div>
                ) : (
                    <p className={styles.loadingText}>Loading face recognition...</p>
                )}
            </div>
            <button onClick={handleFaceLogin} className={styles.loginButton}>
                Login
            </button>
            <Link to='/signup'>Register here ...</Link>
        </div>
    );
};

export default Login;

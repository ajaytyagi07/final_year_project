import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Login.module.css';
import * as faceapi from 'face-api.js';
import { Link, redirect, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const videoRef = useRef();
    const navigate = useNavigate();
    const [isModelLoaded, setIsModelLoaded] = useState(false);

    useEffect(() => {
        const loadModels = async () => {
            await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
            await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
            await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
            setIsModelLoaded(true);
            startVideo();
        };
        loadModels();
    }, []);

    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
            videoRef.current.srcObject = stream;
        } catch (error) {
            console.error('Error accessing webcam:', error);
            alert('Failed to access webcam.');
        }
    };

    const handleLogin = async () => {
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
            const faceDescriptor = Array.from(detections.descriptor);

            try {
                const response = await axios.post('http://localhost:5000/api/login', {
                    email,
                    descriptor: JSON.stringify(faceDescriptor),
                });

                // Store token in local storage
                localStorage.setItem('authToken', response.data.token);

                // alert(response.data.message);
                window.location.href="http://localhost:5173/subjects"
                // redirect('/subjects'); // Redirect to home after login
            } catch (error) {
                console.error('Error during login:', error);
                alert(error.response?.data?.message || 'Error during login.');
            }
        } else {
            alert('No face detected. Please try again.');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Login</h2>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.inputField}
            />
            <div className={styles.faceCaptureContainer}>
                <h3>Face Authentication</h3>
                {!isModelLoaded ? (
                    <p>Loading face recognition models...</p>
                ) : (
                    <video ref={videoRef} autoPlay muted className={styles.video} />
                )}
            </div>
            <button onClick={handleLogin} className={styles.loginButton}>Login</button>
            <Link to="/signup" className={styles.signupLink}>New user? Signup here</Link>
        </div>
    );
};

export default Login;

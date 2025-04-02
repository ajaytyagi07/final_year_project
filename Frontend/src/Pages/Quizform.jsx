/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Quizform.css';
import { useNavigate } from 'react-router-dom';
import * as tf from '@tensorflow/tfjs';
import * as blazeface from '@tensorflow-models/blazeface';

const Quizform = ({ subject }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const modelRef = useRef(null);
  const [faceDetected, setFaceDetected] = useState(true);
  const [warningCount, setWarningCount] = useState(0);
  const [multipleFaces, setMultipleFaces] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/questions?subject=${subject}`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
    startProctoring();
    enforceFullScreen();
    preventTabSwitching();
    disableCheatingMethods();
    return () => stopProctoring();
  }, [subject]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const startProctoring = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      modelRef.current = await blazeface.load();
      detectFace();
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const stopProctoring = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  const detectFace = async () => {
    if (!modelRef.current || !videoRef.current) return;
    const model = modelRef.current;
    setInterval(async () => {
      const predictions = await model.estimateFaces(videoRef.current, false);
      if (predictions.length === 1) {
        setFaceDetected(true);
        setMultipleFaces(false);
      } else {
        setFaceDetected(false);
        setMultipleFaces(predictions.length > 1);
        setWarningCount(prevCount => {
          const newCount = prevCount + 1;
          if (newCount >= 4) {
            stopProctoring();
            navigate('/disqualified');
          }
          return newCount;
        });
      }
    }, 5000);
  };

  const enforceFullScreen = () => {
    const enterFullScreen = () => {
      let elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    };

    enterFullScreen();
    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        alert("You must stay in full-screen mode during the test!");
        enterFullScreen();
      }
    });
  };

  const preventTabSwitching = () => {
    let tabSwitchWarningCount = 0;

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        tabSwitchWarningCount++;
        if (tabSwitchWarningCount >= 3) {
          alert("You have been disqualified for switching tabs multiple times!");
          navigate('/disqualified');
        } else {
          alert(`Tab switching is not allowed! Warning ${tabSwitchWarningCount}/3`);
        }
      }
    });
  };

  const disableCheatingMethods = () => {
    document.addEventListener("contextmenu", (e) => e.preventDefault());
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && (e.key === "u" || e.key === "U")) e.preventDefault();
      if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) e.preventDefault();
      if (e.key === "F12") e.preventDefault();
      if (e.ctrlKey && (e.key === "v" || e.key === "V")) e.preventDefault();
      if (e.ctrlKey && e.key === "Tab") e.preventDefault();
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    stopProctoring();
    try {
      const response = await axios.post('http://localhost:5000/api/submit-answers', {
        answers: Object.entries(answers).map(([question_id, user_answer]) => ({
          question_id,
          user_answer,
        })),
      });
      navigate('/results', { state: { score: response.data.score, report: response.data.report } });
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  return (
    <>
      <h1>Quiz</h1>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ position: 'fixed', top: '88px', right: '15px', width: '200px', border: '2px solid black', borderRadius: '10px', boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)' }}
      />
      {(!faceDetected || multipleFaces) && (
        <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>
          ⚠ {multipleFaces ? 'Multiple faces detected!' : 'Face not detected!'} Warning {warningCount}/4
        </p>
      )}
      {questions.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <form onSubmit={handleSubmit}>
          {questions.map((question) => (
            <div key={question.id}>
              <p>{question.question_text}</p>
              {question.question_type === 'MCQ' && question.options && (
                <div>
                  {question.options.map((option, index) => (
                    <label key={index}>
                      <input
                        type="radio"
                        name={`mcq - ${question.id}`}
                        value={option}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        required
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}
              {question.question_type === 'TF' && (
                <div>
                  <label>
                    <input
                      type="radio"
                      name={`tf - ${question.id}`}
                      value="True"
                      onChange={(e) => handleAnswerChange(question.id, 'true')}
                      required
                    />
                    True
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`tf - ${question.id}`}
                      value="False"
                      onChange={(e) => handleAnswerChange(question.id, 'false')}
                      required
                    />
                    False
                  </label>
                </div>
              )}
              {question.question_type === 'FILL_IN_THE_BLANK' && (
                <input
                  type="text"
                  placeholder="Enter your answer"
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  required
                />
              )}
              {question.question_type === 'DESCRIPTIVE' && (
                <textarea
                  placeholder="Write your answer (max 50 words)"
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  required
                />
              )}
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
};

export default Quizform;

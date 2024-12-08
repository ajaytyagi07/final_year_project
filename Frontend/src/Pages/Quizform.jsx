/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Quizform.css';
import { useNavigate } from 'react-router-dom';

const Quizform = ({ subject }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch questions when the component loads
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/questions?subject=${subject}`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [subject]);

  // Handle answer change
  const handleAnswerChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/submit-answers', {
        answers: Object.entries(answers).map(([question_id, user_answer]) => ({
          question_id,
          user_answer,
        })),
      });

      // Navigate to results page with score and report in state
      navigate('/results', { state: { score: response.data.score, report: response.data.report } });
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  return (
    <>
      <h1>Test</h1>
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
                        name={`mcq-${question.id}`}
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
                      name={`tf-${question.id}`}
                      value="True"
                      onChange={(e) => handleAnswerChange(question.id, 'true')}
                      required
                    />
                    True
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`tf-${question.id}`}
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
                  // maxLength="50"
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

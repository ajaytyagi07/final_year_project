import { useLocation, useNavigate } from 'react-router-dom';
import './Result.css'; // Import the CSS file for styling

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, report } = location.state;

  return (
    <div className="result-container">
      <h1 className="result-title">Quiz Report</h1>
      <p className="score">Total Score: {score}</p>

      <h2 className="report-title">Question Report:</h2>
      {report.map((item, index) => (
        <div
          key={index}
          className={`question-report ${item.is_correct ? 'correct' : 'incorrect'}`}
        >
          <p className="question-text"><strong>Question:</strong> {item.question_text}</p>
          <p className="user-answer"><strong>Your Answer:</strong> {item.user_answer}</p>
          {item.correct_answer && <p className="correct-answer"><strong>Correct Answer:</strong> {item.correct_answer}</p>}
          <p className="status"><strong>Status:</strong> {item.is_correct ? 'Correct' : 'Incorrect'}</p>
          {item.grading_notes && <p className="grading-notes"><strong>Grading Notes:</strong> {item.grading_notes}</p>}
          <hr className="divider" />
        </div>
      ))}

      <button className="back-button" onClick={() => navigate('/subjects')}>Go back to Quiz</button>
    </div>
  );
};

export default Result;

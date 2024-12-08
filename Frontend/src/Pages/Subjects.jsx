import React from 'react';
import './Subjects.css'; // Importing the CSS for styling
import { useNavigate } from 'react-router-dom';

const subjects = [
  { name: 'DSA', color: '#ff5722', imageUrl: 'https://data-flair.training/blogs/wp-content/uploads/sites/2/2021/10/data-structure-quiz.webp', redirect: 'test/physicstest' },
  { name: 'OS', color: '#4caf50', imageUrl: 'https://data-flair.training/blogs/wp-content/uploads/sites/2/2022/02/operating-system-quiz.webp', redirect: 'test/chemistrytest' },
  { name: 'COMPUTER NETWORK', color: '#2196f3', imageUrl: 'https://data-flair.training/blogs/wp-content/uploads/sites/2/2022/02/computer-network-quiz-questions-with-answers.webp', redirect: 'test/biologytest' },
  { name: 'DBMS', color: '#ffeb3b', imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhzZtCK53kW3YGZiiBVqfMeO-1Nag9AmRdDzvfsW5_1ZhB43X6_Rx7SD1Dfjoj5_A1VxD2KCYftNRG1A5b9GQCY_GX9tnJLsSu0S3Wd9RpOpp-GR0KbsPrSddyH62Ef_DdR6jqCYkj4rrda8gbeTk_w5CDp9dA5_LAQDd-TPG78UDo95fCVq1g6ULi3/s1600-rw/database%20quiz%20set%2013.jpg', redirect: 'test/gktest' }
];

const Subjects = () => {
  const navigate = useNavigate();
  return (
    <div className="card-container">
      {subjects.map((subject, index) => (
        <div key={index} className="card" style={{ backgroundColor: subject.color }} onClick={() => { navigate(subject.redirect) }}>
          <div className="card-image">
            <img src={subject.imageUrl} alt={subject.name} />
          </div>
          <div className="card-title">{subject.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Subjects;

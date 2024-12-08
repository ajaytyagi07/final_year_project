import React from 'react';
import './Subjects.css'; // Importing the CSS for styling
import { useNavigate } from 'react-router-dom';

const subjects = [
  { name: 'Physics', color: '#9CD7D1', imageUrl: 'https://blogassets.leverageedu.com/blog/wp-content/uploads/2020/05/21144359/Physics-Quiz.jpg', redirect: 'test/physicstest' },
  { name: 'Chemistry', color: '#195D7D', imageUrl: 'https://englishpluspodcast.com/wp-content/uploads/2024/01/Basic-Chemistry-Quiz.jpg', redirect: 'test/chemistrytest' },
  { name: 'Biology', color: '#69BA60', imageUrl: 'https://cdn6.aptoide.com/imgs/8/a/3/8a390031ef3d156aa80e995fe58f10ff_fgraphic.png', redirect: 'test/biologytest' },
  { name: 'Gk', color: '#B7B5DA', imageUrl: 'https://akm-img-a-in.tosshub.com/aajtak/images/story/202207/gk_quiz-sixteen_nine.png', redirect: 'test/gktest' }
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

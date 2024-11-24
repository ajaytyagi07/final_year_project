import React from 'react';
import './Subjects.css'; // Importing the CSS for styling
import { useNavigate } from 'react-router-dom';

const subjects = [
  { name: 'Physics', color: '#ff5722', imageUrl: 'https://blogassets.leverageedu.com/blog/wp-content/uploads/2020/05/21144359/Physics-Quiz.jpg' ,redirect:'test/physicstest' },
  { name: 'Chemistry', color: '#4caf50', imageUrl: 'https://urs-labs.com/wp-content/uploads/2022/12/chemical-testing.jpg',redirect:'test/chemistrytest' },
  { name: 'Biology', color: '#2196f3', imageUrl: 'https://biologyextra.com/wp-content/uploads/2024/07/Test-Your-Biology-knowledge-10-640x372.png' ,redirect:'test/biologytest' },
  { name: 'General Knowledge', color: '#ffeb3b', imageUrl: 'https://i0.wp.com/www.gkpad.com/wp-content/uploads/2020/12/AwCY0cy.png?resize=702%2C449&ssl=1' ,redirect:'test/gktest' }
];

const Subjects = () => {
  const navigate = useNavigate();
  return (
    <div className="card-container">
      {subjects.map((subject, index) => (
        <div key={index} className="card" style={{ backgroundColor: subject.color }} onClick={()=>{navigate(subject.redirect)}}>
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

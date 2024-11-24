import React from 'react';
import './Home.css'; 
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>Welcome to the Online Practice Test</h1>
        <p>Prepare and practice with ease for Physics, Chemistry, Biology, and General Knowledge.</p>
        <div className="welcome-buttons">
          <Link to="/subjects" className="btn-start">Get Started</Link>
          <Link to="/about" className="btn-learn-more">Learn More</Link>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section">
        <h2>About Us</h2>
        <p>
          Our Online Practice Test platform helps students enhance their knowledge in various subjects like Physics, Chemistry, Biology, and General Knowledge. 
          With a wide variety of questions, we offer a tailored learning experience that prepares you for real-world exams.
        </p>
        <p>
          Whether you are revising for school, preparing for competitive exams, or simply enhancing your general knowledge, our platform provides a wide range of questions 
          in different formats including multiple-choice questions (MCQs), fill-in-the-blanks, and descriptive questions. With us, learning is easier and more effective!
        </p>
      </div>
    </div>
  );
};

export default Home;

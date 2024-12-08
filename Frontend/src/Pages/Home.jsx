import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>Welcome to the Vision Lock</h1>
        <p>A secure, transparent, and efficient examination system that empowers institutions to uphold academic integrity </p>
        <div className="welcome-buttons">
          <Link to="/subjects" className="btn-start">Get Started</Link>
          <Link to="/about" className="btn-learn-more">Learn More</Link>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section">
        <h2>About Us</h2>
        <p>
          Vision Lock aims to set new standards for secure and accessible examinations, reducing instances of malpractice while fostering trust in digital assessment systems.
        </p>
        <p>
          Our VisionLock platform helps students enhance their knowledge in various subjects like DSA, OS, Physics, Chemistry, Biology, and General Knowledge.
          With a wide variety of questions, we offer a tailored learning experience that prepares you for real-world exams.
        </p>
      </div>
    </div>
  );
};

export default Home;

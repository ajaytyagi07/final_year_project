import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Quizform from './Pages/Quizform'; 
import ResultsPage from './Pages/Result'; 
import Home from './Pages/Home';
import Navbar from './component/Navbar';
import Subjects from './Pages/Subjects';

const App = () => {
  return (
    <Router>
    <Navbar/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/subjects/test/physicstest" element={<Quizform subject="physics" />} />
          <Route path="/subjects/test/chemistrytest" element={<Quizform subject="chemistry" />} />
          <Route path="/subjects/test/biologytest" element={<Quizform subject="biology" />} />
          <Route path="/subjects/test/gktest" element={<Quizform subject="GK" />} />
          <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
};







export default App;

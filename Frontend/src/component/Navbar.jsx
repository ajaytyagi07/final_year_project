// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css';
// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">
//         <Link to="/" className="navbar-logo-link">Vision Lock</Link>
//       </div>
//       <ul className="navbar-links">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/subjects">Subjects</Link></li>
//         <li><Link to="/login">Login</Link></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;










import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token); // Convert token existence to boolean
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    alert('You have been logged out.');
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-logo-link">Vision Lock</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/subjects">Subjects</Link></li>
        {!isLoggedIn ? (
          <li><Link to="/login">Login</Link></li>
        ) : (
          <li>
            <Link onClick={handleLogout}>Logout</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

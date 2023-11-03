import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="left">
        <ul>
          <li>
            <Link to="/" className="back-link">
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
          </li>
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
          </li>
          <li>
            <Link to="/about">
              <FontAwesomeIcon icon={faInfo} />  About
            </Link>
          </li>
        </ul>
      </div>
      <div className='center'>
        <h1>BlogBloom</h1>
      </div>
      <div className="right">
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/registration">Registration</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

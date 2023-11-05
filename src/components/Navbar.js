import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfo, faUserPlus, faSignInAlt, faArrowLeft, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
const Navbar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    onSearch(searchInput);
  };

  return (
    <nav className="navbar">
      <div className="left">
        <ul>
          <li>
            <Link to="/blogs" className="back-link">
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
          </li>
          <li>
            <Link to="/blogs">
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
            <li>
              <input
                type="text"
                placeholder="Search by title"
                value={searchInput}
                onChange={handleSearchInputChange}
              />
            </li>
          <li>
            <Link to="/newblog">
              <FontAwesomeIcon icon={faPlusCircle} /> Add New Blog
            </Link>
          </li>
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Link>
          </li>
          
          <li>
            <Link to="/registration">
              <FontAwesomeIcon icon={faUserPlus} /> Register
            </Link>
          </li>
          </ul>
      </div>
    </nav>
  );
};

export default Navbar;

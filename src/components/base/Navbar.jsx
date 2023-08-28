import MenuIcon from '@mui/icons-material/Menu';
import Cookies from 'js-cookie';
import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Logo from '../../images/logo.png';
import { useMessage } from '../context/MessageContext';

/**
 * Navbar is a React component that displays the navigation bar for the application.
 */
const Navbar = () => {
  const { setMessage } = useMessage();
  const token = Cookies.get('access_token');
  const userJSON = Cookies.get('user');

  const user = userJSON ? JSON.parse(userJSON) : null;

  /**
   * Handles the click event when the user logs out.
   * It removes the access token and user information cookies.
   */
  const handleLogoutClick = () => {
    Cookies.remove('access_token');
    Cookies.remove('user');
    setMessage({
      type: 'success',
      body: 'Logged out successfully',
    });

  };

  return (
    <nav
      className="navbar my-0 navbar-expand-lg navbar-light ftco_navbar bg-white ftco-navbar-light"
      id="ftco-navbar"
    >
      <div className="container" id="nav-container">
        <Link to={'/'}>
          <img src={ Logo } alt={'icon...'} width={80} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#ftco-nav"
          aria-controls="ftco-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <MenuIcon />
        </button>
        <div
          className="collapse navbar-collapse d-flex justify-content-end"
          id="ftco-nav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to={'/projects'} className="nav-link">
              Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'/'} className="nav-link">
              Developers
              </Link>
            </li>
            {token ? (
              <li>
                <div className="btn-group">
                  <Link
                    to={`/profiles/${user.profile_slug}`}
                    state={{ slug: user.profile_slug }}
                  >
                    <button type="button" className="btn btn-warning">
                      { user.first_name } { user.last_name }
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-warning dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="sr-only" />
                  </button>
                  <div className="dropdown-menu">
                    <Link
                      className="dropdown-item"
                      to={'/edit-profile'}
                    >
                      Edit Profile
                    </Link>
                    <Link
                      className="dropdown-item"
                      to={`/profiles/${user.profile_slug}`}
                    >
                      View Profile
                    </Link>
                    <Link
                      className="dropdown-item"
                      to={'/add-project'}
                    >
                      Add a project
                    </Link>
                    <div className="dropdown-divider" />
                    <button
                      className="dropdown-item"
                      onClick={handleLogoutClick}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </li>
            ):
              <li className="nav-item">
                <Link
                  to={'/login'}
                  className="nav-link"
                >
                Login
                </Link>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

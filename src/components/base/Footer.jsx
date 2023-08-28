import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer component representing the footer section of the web application.
 * It includes links to various sections of the website.
 *
 * @returns {ReactElement} The footer component.
 */
const Footer = () => {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-muted">© 2023 Code Book, Inc</p>
        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item">
            <Link
              to={'/'}
              className="nav-link px-2 text-muted"
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={'#'}
              className="nav-link px-2 text-muted"
            >
              Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={'#'}
              className="nav-link px-2 text-muted"
            >
              Pricing
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={'#'}
              className="nav-link px-2 text-muted"
            >
              FAQs
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={'#'}
              className="nav-link px-2 text-muted"
            >
              About
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;

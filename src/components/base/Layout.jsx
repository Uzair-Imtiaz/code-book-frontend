import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import Navbar from './Navbar';

/**
 * Layout is a higher-order component that provides a common layout structure for the entire application.
 * It includes a navigation bar, the main content area (children), and a footer.
 *
 * @param {Object} props - The props for this component.
 * @param {ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {ReactElement} The layout component.
 */
const Layout = ({ children }) => {

  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

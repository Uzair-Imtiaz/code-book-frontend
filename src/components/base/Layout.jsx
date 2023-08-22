import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Alert from 'react-bootstrap/Alert';
import Navbar from './Navbar';
import Footer from './Footer';
import { useMessage } from '../context/MessageContext';

const Layout = ({ children }) => {
  const { message, setMessage } = useMessage();
  return (
    <div>
      <Navbar />
      {message && (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <Alert
                variant={ message.type }
                dismissible
                onClose={() => setMessage(null)}
                className="centered-alert"
              >
                <strong>{ message.body }</strong>
              </Alert>
            </div>
          </div>
        </div>
      )}
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

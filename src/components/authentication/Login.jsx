import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Logo from '../../images/logo.png';
import { useMessage } from '../context/MessageContext';
// import { useCookies } from 'react-cookie';
import BaseUrl from '../../config';
import Cookies from 'js-cookie';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState({
    value: '',
    error: false,
  });
  const [password, setPassword] = useState({
    value: '',
    error: false,
  });

  const { setMessage } = useMessage();
  // const [ cookies, setCookie ] = useCookies(['token']);

  const handleBlur = (value, setState) => {
    if (value.trim() === '') {
      setState({ value, error: true });
    }
    else {
      setState({ value, error: false });
    }
  };

  // Handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BaseUrl}/auth/login/`, {
        username: username.value,
        password: password.value,
      });
      if (response.status === 200) {
        const token = response.data.token;
        const user = response.data.user;
        let expiresIn = new Date();
        expiresIn.setTime(expiresIn.getTime() + (60 * 1000));
        Cookies.set('access_token', token, { path: '/', expires: 1, secure: true });
        Cookies.set('user', JSON.stringify(user), { path: '/', expires: 1, secure: true });
        setMessage({
          type: 'success',
          body: 'Log in successfully',
        });
        navigate('/');
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error('Axios error:', error);
      alert('An error occurred while making the request. Please try again.');
    }
  };

  return (
    <div className="container h-100">
      <div className="row justify-content-sm-center h-100">
        <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
          <div className="text-center my-5">
            <Link to={'/'}>
              <img src={Logo} alt="logo" width={100} />
            </Link>
          </div>
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <h1 className="fs-4 card-title fw-bold mb-4">Login</h1>
              <form
                method="post"
                className="needs-validation"
                noValidate
                onSubmit={handleSubmit}
              >
                <div className="mb-3">
                  <label className="mb-2 text-muted" htmlFor="username">
                    Username
                  </label>
                  <input
                    id="username"
                    value={username.value}
                    type="text"
                    className={`form-control ${username.error && 'is-invalid'}`}
                    name="username"
                    placeholder="johndoe"
                    pattern="^[a-zA-Z0-9_]+$"
                    onChange={(e) =>
                      setUsername({ ...username, value: e.target.value })}
                    onBlur={(e) => handleBlur(e.target.value, setUsername)}
                    required
                  />
                  <div className="invalid-feedback">
                    Username is required
                  </div>
                </div>
                <div className="mb-3">
                  <div className="mb-2 w-100">
                    <label className="text-muted" htmlFor="password">
                      Password
                    </label>
                  </div>
                  <input
                    id="password"
                    value={password.value}
                    type="password"
                    className={`form-control ${password.error && 'is-invalid'}`}
                    name="password"
                    placeholder="********"
                    onChange={(e) =>
                      setPassword({ ...password, value: e.target.value })}
                    onBlur={(e) => handleBlur(e.target.value, setPassword)}
                    required />
                  <div className="invalid-feedback">
                    Password is required
                  </div>
                </div>
                <button type="submit" className="btn btn-primary ms-auto">
                  Login
                </button>
              </form>
            </div>
          </div>
          <div className="card-footer py-3 border-0">
            <div className="text-center">
              Don&apos;t have an account? <Link to="/register" className="text-dark">Create One</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import Logo from "../../images/logo.png";

const Login = () => {
  // State for storing username and password
  const [username, setUsername] = useState({
    value: '',
    error: false,
  });
  const [password, setPassword] = useState({
    value: '',
    error: false,
  });

  const handleBlur = (value, setState) => {
    if (value.trim() === '') {
      setState({ value, error: true });
    }
    else {
      setState({ value, error: false });
    }
  };

  // Handle the form submission
  const handleSubmit = (event) => {
    console.log({ username, password });
    event.preventDefault();
  };
  return (
    <div className="container h-100">
      <div className="row justify-content-sm-center h-100">
        <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
          <div className="text-center my-5">
            <Link to={"#"}>
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
                    value={username}
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="johndoe"
                    pattern="^[a-zA-Z0-9_]+$"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoFocus
                  />
                  <div className="invalid-feedback">
                    Username can't be empty
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
                    value={password}
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="********"
                    onChange={(e) => setPassword(e.target.value)}
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
              Don't have an account? <Link to="/register" className="text-dark">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

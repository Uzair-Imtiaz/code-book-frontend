import React from "react";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import "bootstrap/dist/css/bootstrap.css";

const Register = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data, event) => {
    event.preventDefault();
  };

  const isStrongPassword = (value) => {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*()_+{}\]\[:;<>,.?~\-\\/]/;

    let message = '';

    if (value.length < 8) {
      message += 'Password must be at least 8 characters long.\n';
    }
    if (!lowercaseRegex.test(value)) {
      message += 'Password must contain at least one lowercase letter.\n';
    }
    if (!uppercaseRegex.test(value)) {
      message += 'Password must contain at least one uppercase letter.\n';
    }
    if (!digitRegex.test(value)) {
      message += 'Password must contain at least one digit.\n';
    }
    if (!specialCharRegex.test(value)) {
      message += 'Password must contain at least one special character.\n';
    }

    return message === '' ? true : message;
  };
  return (
    <div className="container h-100">
      <div className="row justify-content-sm-center h-100">
        <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <h1 className="fs-4 card-title fw-bold mb-4">Register</h1>
              <form
                method="post"

                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-3">
                  <label className="mb-2 text-muted" htmlFor="name">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                    {...register('firstname', {
                      required: 'Required',
                      minLength: {
                        value: 4,
                        message: 'This Short?',
                      },
                    })}
                  />
                  {errors.firstname && (
                    <div className="invalid-feedback">{errors.firstname.message}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="mb-2 text-muted" htmlFor="last-name">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                    {...register('lastname', {
                      required: 'Required',
                      minLength: {
                        value: 4,
                        message: 'This Short?',
                      },
                    })}
                  />
                  {errors.lastname && (
                    <div className="invalid-feedback">{errors.lastname.message}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="mb-2 text-muted" htmlFor="userName">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder={"john_doe1"}
                    className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
                    {...register('userName', {
                      required: 'Username is required',
                      minLength: {
                        value: 5,
                        message: '5 CHARACTERS!!!',
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9_]+$/,
                        message: 'Username can only contain letters, digits, and underscores',
                      },
                    })}
                  />
                  {errors.userName && (
                    <div className="invalid-feedback">{errors.userName.message}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="mb-2 text-muted" htmlFor="email">
                    E-Mail Address
                  </label>
                  <input
                    type="email"
                    placeholder={"johndoe@gmail.com"}
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    {...register('email', {
                      required: 'Required',
                      pattern: {
                        value: /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]{2,}$/,
                        message: 'Email is invalid',
                      }
                    })}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email.message}</div>
                  )}
                </div>
                <div className="mb-3 position-relative">
                  <label className="mb-2 text-muted" htmlFor="password">
                    Password
                  </label>
                  <input
                      type="password"
                      placeholder={"********"}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      {...register('password', {
                        required: 'Password is required.',
                        validate: (value) => isStrongPassword(value)
                      })}
                    />
                      {errors.password &&
                          <div className="invalid-feedback" > {errors.password.message} </div>}
                </div>
                <div className="mb-3">
                  <label className="mb-2 text-muted" htmlFor="confirm-password">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder={"********"}
                    className={`form-control ${errors.passwordConfirmation ? 'is-invalid' : ''}`}
                    {...register('passwordConfirmation', {
                      required: 'Please confirm your password',
                      validate: (value) =>
                        value === watch('password') || 'Passwords do not match',
                    })}
                  />
                  {errors.passwordConfirmation && (
                    <div className="invalid-feedback">
                      {errors.passwordConfirmation.message}
                    </div>
                  )}
                </div>
                <div className="align-items-center d-flex">
                  <button type="submit" className="btn btn-primary ms-auto">
                    Register
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer py-3 border-0">
              <div className="text-center">
                Already have an account?{" "}
                <Link to={"/login"} className="text-dark">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

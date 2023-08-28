import axios from 'axios';

import BaseUrl from '../../../config';

/**
 * Handles user registration by making a POST request to the registration endpoint.
 *
 * @param {Object} data - User registration data.
 * @param {string} data.firstname - User's first name.
 * @param {string} data.lastname - User's last name.
 * @param {string} data.email - User's email address.
 * @param {string} data.userName - User's username.
 * @param {string} data.password - User's password.
 * @returns {Promise<Object>} An object indicating the registration result.
 * @throws {Error} Throws an error if registration fails.
 */
const handleRegistration = async (data) => {
  try {
    const response = await axios.post(`${BaseUrl}/auth/register/`, {
      /* eslint-disable camelcase */
      first_name: data.firstname,
      last_name: data.lastname,
      /* eslint-enable camelcase */
      email: data.email,
      username: data.userName,
      password: data.password,
    });
    if (response.status === 201) {
      return {
        success: true,
        message: {
          type: 'success',
          body: 'Registered successfully',
        },
      };
    }
  } catch (error) {
    if (error.response && error.response.data) {
      if (error.response.status === 400) {
        return {
          success: false,
          message: {
            type: 'danger',
            body: error.response.data.username,
          },
        };
      } else {
        return {
          success: false,
          message: {
            type: 'danger',
            body: error.response.data.error,
          },
        };
      }
    }
  }
};

/**
 * Handles user registration by making a POST request to the registration endpoint.
 *
 * @param {Object} data - User registration data.
 * @param {string} data.firstname - User's first name.
 * @param {string} data.lastname - User's last name.
 * @param {string} data.email - User's email address.
 * @param {string} data.userName - User's username.
 * @param {string} data.password - User's password.
 * @returns {Promise<Object>} An object indicating the registration result.
 * @throws {Error} Throws an error if registration fails.
 */
export const isStrongPassword = (value) => {
  const lowercaseRegex = /[a-z]/;
  const uppercaseRegex = /[A-Z]/;
  const digitRegex = /\d/;
  const specialCharRegex = /[!@#$%^&*()_+{}[\]:;<>,.?~\-\\/]/;

  let errorMessage = '';

  if (value.length < 8) {
    errorMessage += 'Password must be at least 8 characters long';
  } else {
    if (!lowercaseRegex.test(value)) {
      errorMessage += 'Password must contain at least one lowercase letter. ';
    }
    if (!uppercaseRegex.test(value)) {
      errorMessage += 'Password must contain at least one uppercase letter. ';
    }
    if (!digitRegex.test(value)) {
      errorMessage += 'Password must contain at least one digit. ';
    }
    if (!specialCharRegex.test(value)) {
      errorMessage += 'Password must contain at least one special character. ';
    }
  }
  return errorMessage === '' ? true : errorMessage;
};

export default handleRegistration;

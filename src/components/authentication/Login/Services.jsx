import axios from 'axios';
import Cookies from 'js-cookie';

import BaseUrl from '../../../config';

/**
 * Handles user login.
 *
 * @param {Object} username - The username input field value.
 * @param {Object} password - The password input field value.
 * @returns {Promise<Object>} An object representing the login result.
 * @throws {Error} If there's an error during the login process.
 */
const handleLogin = async (username, password) => {
  try {
    const response = await axios.post(`${BaseUrl}/auth/login/`, {
      username: username.value,
      password: password.value,
    });
    if (response.status === 200) {
      const token = response.data.token;
      const user = response.data.user;
      let expiresIn = new Date();
      expiresIn.setTime(expiresIn.getTime() + 60 * 1000);
      Cookies.set('access_token', token, { path: '/', expires: 1, secure: true });
      Cookies.set('user', JSON.stringify(user), { path: '/', expires: 1, secure: true });
      return {
        user: user,
        success: true,
        message: {
          type: 'success',
          body: 'Log in successfully',
        },
      };
    }
  } catch (error) {
    if (error.response && error.response.data) {
      return {
        success: false,
        message : {
          type: 'danger',
          body: error.response.data.error,
        },
      };
    }
  }
};

export default handleLogin;

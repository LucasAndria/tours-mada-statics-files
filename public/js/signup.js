import axios from 'axios';
import { showAlert } from './alerts';

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', `welcome ${name} !`);
      return window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    if (err.response.data) {
      return err.response.data.message;
    } else {
      return err.message;
    }
  }
};

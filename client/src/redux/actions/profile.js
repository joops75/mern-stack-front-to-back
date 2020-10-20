import axios from 'axios';
import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  UPDATE_PROFILE,
  PROFILE_ERROR,
  ACCOUNT_DELETED,
  CLEAR_PROFILE
} from './actionTypes';
import { setAlert } from './alert';

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/me`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getProfileByUserId = (user_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${user_id}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getAllProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get('/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

export const getGithubRepos = (github_username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${github_username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const createEditProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(
      setAlert(edit ? 'Profile updated.' : 'Profile created.', 'success')
    );

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const { errors } = err.response.data;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addExperienceEducation = (
  formData,
  history,
  experience = true
) => async (dispatch) => {
  const expEdu = experience ? 'Experience' : 'Education';

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(
      `/api/profile/${expEdu.toLowerCase()}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(`${expEdu} added.`, 'success'));

    history.push('/dashboard');
  } catch (err) {
    const { errors } = err.response.data;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteExperienceEducation = (id, experience = true) => async dispatch => {
  const expEdu = experience ? 'Experience' : 'Education';

  try {
    const res = await axios.delete(`/api/profile/${expEdu.toLowerCase()}/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(`${expEdu} deleted.`, 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
    try {
      const res = await axios.delete(`/api/profile`);

      dispatch({ type: ACCOUNT_DELETED});

      dispatch({ type: CLEAR_PROFILE });

      dispatch(setAlert(`${res.data.msg}`));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
}

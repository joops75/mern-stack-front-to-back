import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST
} from './actionTypes';

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const likeUnlike = (post_id, like = true) => async (dispatch) => {
  try {
    const likeunlike = like ? 'like' : 'unlike';
    const res = await axios.put(`/api/posts/${likeunlike}/${post_id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { post_id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deletePost = (post_id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${post_id}`);

    dispatch({
      type: DELETE_POST,
      payload: post_id
    });

    dispatch(setAlert(res.data.msg, 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addPost = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/posts/', formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Post added.', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

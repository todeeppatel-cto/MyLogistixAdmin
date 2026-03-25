import axios from 'axios';
import { API_BASE_URL } from '../../constants/apiBaseUrl';
import {
  getRequest,
  getSuccess,
  getFailed,
  createSuccess,
  updateSuccess,
  deleteSuccess
} from './b2bcourierrateSlice';

const API_URL = API_BASE_URL;

export const getAllCourierRates = () => async (dispatch) => {
  dispatch(getRequest());
  try {
    const res = await axios.get(`${API_URL}/b2b-rates`);
    dispatch(getSuccess(res.data));
  } catch (err) {
    dispatch(getFailed(err.message));
  }
};

export const addCourierRate = (formData) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const res = await axios.post(API_URL, formData);
    dispatch(createSuccess(res.data.data));
  } catch (err) {
    dispatch(getFailed(err.message));
  }
};

export const updateCourierRate = (id, formData) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const res = await axios.put(`${API_URL}/${id}`, formData);
    dispatch(updateSuccess(res.data.data));
  } catch (err) {
    dispatch(getFailed(err.message));
  }
};

export const deleteCourierRate = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    await axios.delete(`${API_URL}/${id}`);
    dispatch(deleteSuccess(id));
  } catch (err) {
    dispatch(getFailed(err.message));
  }
};

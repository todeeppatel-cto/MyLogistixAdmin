import axios from 'axios';
import { setLoading, setRates, setError } from './rateCalculatorSlice';
import { API_BASE_URL } from '../../constants/apiBaseUrl';

const BASE_URL = API_BASE_URL;

export const calculateRates = (formData) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await axios.post(`${BASE_URL}/calculate-rates`, formData);
    dispatch(setRates(res.data));
  } catch (error) {
    dispatch(setError(error?.response?.data?.message || 'Failed to calculate rates'));
  }
};



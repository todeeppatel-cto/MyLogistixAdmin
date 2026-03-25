import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../constants/apiBaseUrl';

export const calculateRate = createAsyncThunk('rate/calculate', async (data) => {
  const res = await axios.post(`${API_BASE_URL}/api/calculate`, data);
  return res.data;
});

const rateSlice = createSlice({
  name: 'rates',
  initialState: { result: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(calculateRate.fulfilled, (state, action) => {
      state.result = action.payload;
    });
  }
});

export default rateSlice.reducer;

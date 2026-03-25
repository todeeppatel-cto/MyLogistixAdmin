import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const calculateRate = createAsyncThunk('rate/calculate', async (data) => {
  const res = await axios.post('http://localhost:8000/api/calculate', data);
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

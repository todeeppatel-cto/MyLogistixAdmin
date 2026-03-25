import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFiles = createAsyncThunk('files/fetch', async () => {
  const res = await axios.get('http://localhost:8000/files');
  return res.data;
});

export const uploadFile = createAsyncThunk('files/upload', async (formData) => {
  const res = await axios.post('http://localhost:8000/files/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data.file;
});

const fileSlice = createSlice({
  name: 'files',
  initialState: { list: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  }
});

export default fileSlice.reducer;

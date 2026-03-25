import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createNDREntry = createAsyncThunk(
  'ndr/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/createNDRException', data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAllNDREntries = createAsyncThunk(
  'ndr/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8000/getallNDR');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateNDRAction = createAsyncThunk(
  'ndr/update',
  async ({ id, update }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:8000/updateNDR/${id}`, update);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteNDREntry = createAsyncThunk(
  'ndr/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8000/deleteNDR/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);   

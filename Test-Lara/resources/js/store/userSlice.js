import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// THUNKS
export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const res = await axios.get('/api/users');
  return res.data.data;
});

export const createUser = createAsyncThunk('users/create', async (user, { dispatch, rejectWithValue }) => {
  try {
    await axios.post('/api/users/create', user);
    dispatch(fetchUsers());
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

export const updateUser = createAsyncThunk('users/update', async (user, { dispatch, rejectWithValue }) => {
  try {
    const data = { name: user.name, email: user.email };
    if (user.password) data.password = user.password;

    await axios.patch(`/api/users/edit/${user.id}`, data);
    dispatch(fetchUsers());
  } catch (err) {
    return rejectWithValue(err.response);
  }
});


export const deleteUser = createAsyncThunk('users/delete', async (id, { dispatch }) => {
  await axios.delete(`/api/users/delete/${id}`);
  dispatch(fetchUsers());
});

// SLICE
const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    editing: null,
    loading: false,
    error: null,
  },
  reducers: {
    setEditingUser: (state, action) => {
      state.editing = action.payload;
    },
    clearEditingUser: (state) => {
      state.editing = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = 'Error al obtener usuarios';
      });
  },
});

export const { setEditingUser, clearEditingUser } = userSlice.actions;
export default userSlice.reducer;

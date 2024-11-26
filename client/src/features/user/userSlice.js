import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userInfo(state, action) {
      state.id = action.payload.id
      state.name = action.payload.name
      state.email = action.payload.email
    },
    clearInfo(state) {
      state.id = null
      state.name = ""
      state.email = ""
    }
  },
});

export const { userInfo, clearInfo } = userSlice.actions;

export default userSlice.reducer;

// studentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const teacherSlice = createSlice({
  name: 'teachers',
  initialState: [],
  reducers: {
    addTeacher: (state, action) => {
      state.push(action.payload);
    },
    deleteTeacher: (state, action) => {
      return state.filter((_, index) => index !== action.payload);
    },
  },
});

export const { addTeacher, deleteTeacher } = teacherSlice.actions;
export default teacherSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import studentReducer from './slice/studentSlice';
import teacherReducer from './slice/teachersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentReducer,
    teachers: teacherReducer,
  },
});

import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer';

// Configure the Redux store using Redux Toolkit
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;

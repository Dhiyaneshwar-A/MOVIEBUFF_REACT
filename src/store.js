import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer';
import { logger } from 'redux-logger'; // Example middleware
import { thunk } from 'redux-thunk';

// Configure the Redux store using Redux Toolkit
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, logger), // Add your middleware here
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';

// Configure the Redux store
export const store = configureStore({
  // Combine reducers
  reducer: {
    todos: todosReducer, // The todos slice reducer
  },
});

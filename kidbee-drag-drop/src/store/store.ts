import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from '../reducers/notificationReducer'; // Импортируйте ваш редьюсер

const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
});

export default store;

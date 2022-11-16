import {configureStore} from '@reduxjs/toolkit';
import itemReducer from './addItemSlice';

export const store = configureStore({
  reducer: {
    item: itemReducer,
  },
});

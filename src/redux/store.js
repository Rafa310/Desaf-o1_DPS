
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import eventsReducer from './slices/eventsSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    events: eventsReducer,
  },
});
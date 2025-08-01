import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  coupon: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    applyCoupon: (state, action) => {
      state.coupon = action.payload; // Ej: "DESCUENTO10"
    },
  },
});

export const { addToCart, removeFromCart, applyCoupon } = cartSlice.actions;
export default cartSlice.reducer;
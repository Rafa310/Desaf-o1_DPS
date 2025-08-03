import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  coupon: null,
};

export const cartSlice = createSlice({
  name: 'carrito', 
  initialState,
  reducers: {
    addToCart: (state, action) => {
  const existingItem = state.items.find(item => item.id === action.payload.id);
  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1; // Incrementa cantidad si ya existe
  } else {
    state.items.push({ ...action.payload, quantity: 1 }); // Añade nuevo item
  }
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
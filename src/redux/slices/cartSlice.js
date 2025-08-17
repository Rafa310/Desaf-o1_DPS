import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  coupons: [
    { code: 'DESCUENTO10', discount: 0.1 },  // 10% de descuento
    { code: 'FIESTA20', discount: 0.2 }      // 20% de descuento
  ],
  appliedCoupon: null
};

export const cartSlice = createSlice({
  name: 'carrito',
  initialState,
  reducers: {
    // Manejo de productos en el carrito
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    // Manejo de cupones
    applyCoupon: (state, action) => {
      const coupon = state.coupons.find(c => c.code === action.payload);
      if (coupon) {
        state.appliedCoupon = coupon;
      }
    },

    addCoupon: (state, action) => {
      // action.payload debe ser un objeto { code: string, discount: number }
      if (!state.coupons.some(c => c.code === action.payload.code)) {
        state.coupons.push({
          code: action.payload.code.toUpperCase(),
          discount: Math.min(0.99, Math.max(0.01, action.payload.discount)) // Asegura que esté entre 1% y 99%
        });
      }
    },

    removeCoupon: (state, action) => {
      state.coupons = state.coupons.filter(c => c.code !== action.payload);
      if (state.appliedCoupon?.code === action.payload) {
        state.appliedCoupon = null;
      }
    },

    // Limpiar carrito (nuevo reducer útil)
    clearCart: (state) => {
      state.items = [];
      state.appliedCoupon = null;
    }
  }
});

// Exporta todas las acciones
export const { 
  addToCart,
  removeFromCart,
  applyCoupon,
  addCoupon,
  removeCoupon,
  clearCart
} = cartSlice.actions;

// Selector útil para calcular el total con descuento
export const selectFinalTotal = (state) => {
  const total = state.cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return state.cart.appliedCoupon 
    ? total * (1 - state.cart.appliedCoupon.discount)
    : total;
};

export default cartSlice.reducer;
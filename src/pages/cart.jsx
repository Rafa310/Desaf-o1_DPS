import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, applyCoupon } from '../redux/slices/cartSlice';

export default function Cart() {
  const { items, coupon } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = items.reduce((sum, item) => sum + item.price, 0);
  const finalTotal = coupon === "DESCUENTO10" ? total * 0.9 : total;

  return (
    <div>
      <h2>Carrito</h2>
      {items.map((item) => (
        <div key={item.id}>
          <span>{item.title} - ${item.price}</span>
          <button onClick={() => dispatch(removeFromCart(item.id))}>❌</button>
        </div>
      ))}
      <input 
        type="text" 
        placeholder="Cupón" 
        onChange={(e) => dispatch(applyCoupon(e.target.value))} 
      />
      <p>Total: ${finalTotal.toFixed(2)}</p>
    </div>
  );
}
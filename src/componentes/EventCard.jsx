import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

export default function EventCard({ event }) {
  const dispatch = useDispatch();

  return (
    <div>
      <h3>{event.title}</h3>
      <p>Precio: ${event.price}</p>
      <button onClick={() => dispatch(addToCart(event))}>
        Añadir al carrito
      </button>
    </div>
  );
}
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function EventCard({ event }) {
  const dispatch = useDispatch(); 
  

  return (
    <div className="event-card">
      <Link href={`/event/${event.id}`} className="event-link">
        <h3 className="event-title-card">{event.title}</h3>
      </Link>
      <p className="event-price-card">Precio: ${event.price}</p>
      <button 
        onClick={() => {
          dispatch(addToCart(event));
          toast.success(`¡${event.title} añadido!`);
        }}
        className="add-to-cart-btn"
      >
        Añadir al carrito
      </button>
    </div>
  );
}
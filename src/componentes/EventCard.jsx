import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import Link from 'next/link';


export default function EventCard({ event }) {
  const dispatch = useDispatch(); 
  

  return (
    <div style={styles.card}>
      <Link href={`/event/${event.id}`} style={styles.link}>
        <h3>{event.title}</h3>
      </Link>
      <p>Precio: ${event.price}</p>
      <button 
        onClick={() => {
          dispatch(addToCart(event));
          toast.success(`¡${event.title} añadido!`);
        }}
        style={{
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Añadir al carrito
      </button>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '1.5rem',
    backgroundColor: 'white',
    transition: 'transform 0.2s',
    ':hover': {
      transform: 'translateY(-4px)'
    }
  },
  link: {
    color: '#2980b9',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline'
    }
  }
};
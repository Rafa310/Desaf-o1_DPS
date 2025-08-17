
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { addToCart } from '../../redux/slices/cartSlice';

export default function EventDetail() {
  const router = useRouter();
  const { id } = router.query;
  const event = useSelector((state) => 
    state.events.find((e) => e.id === Number(id))
  );
  const dispatch = useDispatch();

  if (!event) return <div>Evento no encontrado</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{event.title}</h1>
      <p style={styles.price}>Precio: ${event.price}</p>
      <p style={styles.description}>
        {event.description || "Descripción no disponible"}
      </p>
      <button
        onClick={() => {
          dispatch(addToCart(event));
          toast.success(`¡${event.title} añadido al carrito!`);
        }}
        style={styles.button}
      >
        Reservar entrada
      </button>
      <Link href="/" style={styles.backLink}>
        ← Volver al inicio
      </Link>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  title: {
    color: '#2c3e50',
    fontSize: '2rem',
    marginBottom: '1rem'
  },
  price: {
    fontSize: '1.5rem',
    color: '#e74c3c',
    fontWeight: 'bold',
    margin: '1rem 0'
  },
  description: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#34495e',
    marginBottom: '2rem'
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  backLink: {
    display: 'inline-block',
    marginTop: '1rem',
    color: '#3498db',
    textDecoration: 'none'
  }
};
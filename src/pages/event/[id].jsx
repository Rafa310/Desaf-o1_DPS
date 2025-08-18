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

  if (!event) return <div className="event-not-found">Evento no encontrado</div>;

  return (
    <div className="event-detail-container">
      <h1 className="event-title">{event.title}</h1>
      <p className="event-price">Precio: ${event.price}</p>
      <p className="event-description">
        {event.description || "Descripción no disponible"}
      </p>
      <button
        onClick={() => {
          dispatch(addToCart(event));
          toast.success(`¡${event.title} añadido al carrito!`);
        }}
        className="reserve-btn"
      >
        Reservar entrada
      </button>
      <Link href="/" className="back-link">
        ← Volver al inicio
      </Link>
    </div>
  );
}
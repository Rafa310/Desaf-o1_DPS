import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addEvent, deleteEvent, updateEvent } from '../redux/slices/eventsSlice';
import { addCoupon, removeCoupon } from '../redux/slices/cartSlice';

export default function AdminPanel() {
  // Estados para eventos
  const events = useSelector((state) => state.events);
  const { coupons } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  
  const [newEvent, setNewEvent] = useState({ 
    title: '', 
    price: 0, 
    description: '' 
  });
  
  const [editingEvent, setEditingEvent] = useState(null);
  
  // Estados para cupones
  const [newCoupon, setNewCoupon] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(10);

  // Handlers para eventos
  const handleAddEvent = () => {
    if (!newEvent.title || newEvent.price <= 0) return;
    dispatch(addEvent({ 
      ...newEvent,
      id: Date.now().toString()
    }));
    setNewEvent({ title: '', price: 0, description: '' });
  };

  const handleUpdateEvent = () => {
    dispatch(updateEvent(editingEvent));
    setEditingEvent(null);
  };

  // Handlers para cupones
  const handleAddCoupon = () => {
    const couponCode = newCoupon.trim().toUpperCase();
    if (couponCode && !coupons.some(c => c.code === couponCode)) {
      dispatch(addCoupon({
        code: couponCode,
        discount: discountPercentage / 100
      }));
      setNewCoupon('');
      setDiscountPercentage(10);
    }
  };

  return (
    <div className="admin-container">
      <h1>Panel de Administración</h1>
      
      {/* Sección de Eventos */}
      <div className="admin-section">
        <h2>{editingEvent ? 'Editar Evento' : 'Añadir Evento'}</h2>
        <div className="form-row">
          <input
            type="text"
            placeholder="Título"
            value={editingEvent ? editingEvent.title : newEvent.title}
            onChange={(e) => 
              editingEvent 
                ? setEditingEvent({ ...editingEvent, title: e.target.value })
                : setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Precio"
            value={editingEvent ? editingEvent.price : newEvent.price}
            onChange={(e) => 
              editingEvent
                ? setEditingEvent({ ...editingEvent, price: Number(e.target.value) })
                : setNewEvent({ ...newEvent, price: Number(e.target.value) })
            }
          />
        </div>
        <textarea
          placeholder="Descripción"
          value={editingEvent ? editingEvent.description : newEvent.description}
          onChange={(e) => 
            editingEvent
              ? setEditingEvent({ ...editingEvent, description: e.target.value })
              : setNewEvent({ ...newEvent, description: e.target.value })
          }
        />
        <div>
          {editingEvent ? (
            <>
              <button className="btn btn-success" onClick={handleUpdateEvent}>Guardar</button>
              <button className="btn btn-danger" onClick={() => setEditingEvent(null)}>Cancelar</button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={handleAddEvent}>Añadir Evento</button>
          )}
        </div>
      </div>

      {/* Lista de Eventos */}
      <div className="admin-section">
        <h2>Eventos Existentes</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>${event.price.toFixed(2)}</td>
                <td>{event.description}</td>
                <td>
                  <button className="btn btn-warning" onClick={() => setEditingEvent(event)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => dispatch(deleteEvent(event.id))}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sección de Cupones */}
      <div className="admin-section">
        <h2>Gestión de Cupones</h2>
        <div className="form-row">
          <input
            type="text"
            placeholder="Código (ej: VERANO15)"
            value={newCoupon}
            onChange={(e) => setNewCoupon(e.target.value.toUpperCase())}
          />
          <div className="coupon-discount">
            <span>Descuento:</span>
            <input
              type="number"
              min="1"
              max="100"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(Math.min(100, Math.max(1, e.target.value)))}
            />
            <span>%</span>
          </div>
          <button
            className="btn btn-success"
            onClick={handleAddCoupon}
            disabled={!newCoupon.trim()}
          >
            Añadir Cupón
          </button>
        </div>

        <h3>Cupones Existentes</h3>
        {coupons.length === 0 ? (
          <p>No hay cupones registrados</p>
        ) : (
          <ul className="coupon-list">
            {coupons.map((coupon) => (
              <li key={coupon.code}>
                <div>
                  <strong>{coupon.code}</strong> - {coupon.discount * 100}% de descuento
                </div>
                <button className="btn btn-danger" onClick={() => dispatch(removeCoupon(coupon.code))}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
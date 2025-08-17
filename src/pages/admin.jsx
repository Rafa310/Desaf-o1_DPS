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
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Panel de Administración</h1>
      
      {/* Sección de Eventos */}
      <div style={{ 
        marginBottom: '40px',
        padding: '20px',
        border: '1px solid #eee',
        borderRadius: '8px'
      }}>
        <h2>{editingEvent ? 'Editar Evento' : 'Añadir Evento'}</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Título"
            value={editingEvent ? editingEvent.title : newEvent.title}
            onChange={(e) => 
              editingEvent 
                ? setEditingEvent({ ...editingEvent, title: e.target.value })
                : setNewEvent({ ...newEvent, title: e.target.value })
            }
            style={{ flex: 2, padding: '8px' }}
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
            style={{ flex: 1, padding: '8px' }}
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
          style={{ 
            width: '100%',
            padding: '8px',
            marginBottom: '10px',
            minHeight: '80px'
          }}
        />
        <div>
          {editingEvent ? (
            <>
              <button 
                onClick={handleUpdateEvent}
                style={{ 
                  padding: '8px 16px',
                  background: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  marginRight: '10px'
                }}
              >
                Guardar
              </button>
              <button 
                onClick={() => setEditingEvent(null)}
                style={{ 
                  padding: '8px 16px',
                  background: '#f44336',
                  color: 'white',
                  border: 'none'
                }}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button 
              onClick={handleAddEvent}
              style={{ 
                padding: '8px 16px',
                background: '#2196F3',
                color: 'white',
                border: 'none'
              }}
            >
              Añadir Evento
            </button>
          )}
        </div>
      </div>

      {/* Lista de Eventos */}
      <div style={{ marginBottom: '40px' }}>
        <h2>Eventos Existentes</h2>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          marginTop: '10px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Título</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Precio</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Descripción</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{event.title}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>${event.price.toFixed(2)}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{event.description}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <button 
                    onClick={() => setEditingEvent(event)}
                    style={{ 
                      marginRight: '5px',
                      padding: '5px 10px',
                      background: '#FFC107',
                      color: 'black',
                      border: 'none'
                    }}
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => dispatch(deleteEvent(event.id))}
                    style={{ 
                      padding: '5px 10px',
                      background: '#f44336',
                      color: 'white',
                      border: 'none'
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sección de Cupones */}
      <div style={{ 
        padding: '20px',
        border: '1px solid #eee',
        borderRadius: '8px'
      }}>
        <h2>Gestión de Cupones</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Código (ej: VERANO15)"
            value={newCoupon}
            onChange={(e) => setNewCoupon(e.target.value.toUpperCase())}
            style={{ flex: 1, padding: '8px' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span>Descuento:</span>
            <input
              type="number"
              min="1"
              max="100"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(Math.min(100, Math.max(1, e.target.value)))}
              style={{ width: '60px', padding: '8px' }}
            />
            <span>%</span>
          </div>
          <button
            onClick={handleAddCoupon}
            disabled={!newCoupon.trim()}
            style={{ 
              padding: '8px 16px',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              opacity: !newCoupon.trim() ? 0.6 : 1,
              cursor: !newCoupon.trim() ? 'not-allowed' : 'pointer'
            }}
          >
            Añadir Cupón
          </button>
        </div>

        <h3>Cupones Existentes</h3>
        {coupons.length === 0 ? (
          <p>No hay cupones registrados</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {coupons.map((coupon) => (
              <li 
                key={coupon.code}
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px',
                  borderBottom: '1px solid #eee'
                }}
              >
                <div>
                  <strong>{coupon.code}</strong> - {coupon.discount * 100}% de descuento
                </div>
                <button
                  onClick={() => dispatch(removeCoupon(coupon.code))}
                  style={{ 
                    padding: '5px 10px',
                    background: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px'
                  }}
                >
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
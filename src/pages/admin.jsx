import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addEvent, deleteEvent, updateEvent } from '../redux/slices/eventsSlice';

export default function AdminPanel() {
  const events = useSelector((state) => state.events);
  const dispatch = useDispatch();
  const [newEvent, setNewEvent] = useState({ title: '', price: 0 });
  const [editingEvent, setEditingEvent] = useState(null);

  const handleAddEvent = () => {
    if (!newEvent.title || newEvent.price <= 0) return;
    dispatch(addEvent(newEvent));
    setNewEvent({ title: '', price: 0 });
  };

  const handleUpdateEvent = () => {
    dispatch(updateEvent(editingEvent));
    setEditingEvent(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Panel de Administración</h1>
      
      {/* Formulario para Añadir/Editar */}
      <div style={{ marginBottom: '20px' }}>
        <h2>{editingEvent ? 'Editar Evento' : 'Añadir Evento'}</h2>
        <input
          type="text"
          placeholder="Título del evento"
          value={editingEvent ? editingEvent.title : newEvent.title}
          onChange={(e) => 
            editingEvent 
              ? setEditingEvent({ ...editingEvent, title: e.target.value })
              : setNewEvent({ ...newEvent, title: e.target.value })
          }
          style={{ marginRight: '10px' }}
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
          style={{ marginRight: '10px' }}
        />
        {editingEvent ? (
          <button onClick={handleUpdateEvent}>Guardar Cambios</button>
        ) : (
          <button onClick={handleAddEvent}>Añadir Evento</button>
        )}
        {editingEvent && (
          <button 
            onClick={() => setEditingEvent(null)}
            style={{ marginLeft: '10px' }}
          >
            Cancelar
          </button>
        )}
      </div>

      {/* Lista de Eventos */}
      <div>
        <h2>Eventos Existentes</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Título</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Precio</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{event.title}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>${event.price}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <button 
                    onClick={() => setEditingEvent(event)}
                    style={{ marginRight: '5px' }}
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => dispatch(deleteEvent(event.id))}
                    style={{ backgroundColor: '#ff4444', color: 'white' }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
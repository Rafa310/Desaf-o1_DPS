
import React from 'react';
import { useSelector } from 'react-redux';
import EventCard from '../componentes/EventCard';
import { useState } from 'react';


export default function Home() {

  const [searchTerm, setSearchTerm] = useState('');
  const events = useSelector((state) => 
    state.events.filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase())
    ));

  return (
    <div style={styles.container}>
      <h1>Eventos Disponibles</h1>
      <input
        type="text"
        placeholder="Buscar eventos..."
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchInput}
      />
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1rem'
      }}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  searchInput: {
    padding: '10px',
    width: '100%',
    maxWidth: '500px',
    margin: '20px 0',
    border: '1px solid #ddd',
    borderRadius: '4px'
  }
};
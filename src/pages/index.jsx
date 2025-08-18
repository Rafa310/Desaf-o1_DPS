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
    <div className="home-page">
      <h1>Eventos Disponibles</h1>
      <input
        type="text"
        placeholder="Buscar eventos..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="events-grid">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
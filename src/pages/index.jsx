// src/pages/index.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import EventCard from '../componentes/EventCard';

export default function Home() {
  const events = useSelector((state) => state.events);

  return (
    <div>
      <h1>EventHub</h1>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
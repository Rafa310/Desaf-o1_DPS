// src/redux/slices/eventsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 1, title: "Concierto de Rock", price: 50 },
  { id: 2, title: "Teatro Clásico", price: 25 },
  { id: 3, title: "Concierto de POP", price: 50},
  { id: 4, title: "Danza contemporanea", price: 15},
  { id: 5, title: "Artista nacional", price: 15},
  { id: 6, title: "Danza clasica", price: 30},
  { id: 7, title: "Concierto clasico", price: 30},
  { id: 8, title: "Musico Internacional", price: 100},
];

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      // Genera un ID único (simplificado)
      const newId = state.length > 0 ? Math.max(...state.map(e => e.id)) + 1 : 1;
      state.push({ ...action.payload, id: newId });
    },
    deleteEvent: (state, action) => {
      return state.filter(event => event.id !== action.payload);
    },
    updateEvent: (state, action) => {
      const index = state.findIndex(e => e.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
  },
});

export const { addEvent, deleteEvent, updateEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
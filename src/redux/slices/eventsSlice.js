
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 1, title: "Concierto de Rock", price: 50, description: "Colección de canciones locales de genero rock." },
  { id: 2, title: "Teatro Clásico", price: 25, description: "Conjunto de musica clasica en vivo, con piezas de Tchaikovsky, Mozart, Beethoven y " },
  { id: 3, title: "Concierto de POP", price: 50, description: "Colección de canciones locales del genero POP" },
  { id: 4, title: "Danza contemporanea", price: 15, description: "Demostración actistica nacional de danza." },
  { id: 5, title: "Artista nacional", price: 15, description: "Aqui es un espacio para que los solistas nacionales puedan lucirse." },
  { id: 6, title: "Danza clasica", price: 30, description: "Aquí tenemos danza pero de la epoca clásica como la danza de los cisnes, etc." },
  { id: 7, title: "Musico Internacional", price: 100, description: "Invitado internacional traído al país para el disfrute de nuestra gente." },
];

export const eventsSlice = createSlice({
  name: 'Eventos',
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
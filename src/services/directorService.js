import axios from 'axios';

const API_URL = 'https://backend-peliculas-aqz3.onrender.com/directores';

export const obtenerDirectores = () => axios.get(API_URL);
export const crearDirector = (director) => axios.post(API_URL, director);
export const actualizarDirector = (id, director) => axios.put(`${API_URL}/${id}`, director);
export const eliminarDirector = (id) => axios.delete(`${API_URL}/${id}`);
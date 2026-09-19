import axios from 'axios';

const API_URL = 'https://backend-peliculas-aqz3.onrender.com/tipos';

export const obtenerTipos = () => axios.get(API_URL);
export const crearTipo = (tipo) => axios.post(API_URL, tipo);
export const actualizarTipo = (id, tipo) => axios.put(`${API_URL}/${id}`, tipo);
export const eliminarTipo = (id) => axios.delete(`${API_URL}/${id}`);
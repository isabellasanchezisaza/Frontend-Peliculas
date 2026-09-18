import axios from 'axios';

const API_URL = 'http://localhost:3000/generos';

export const obtenerGeneros = () => axios.get(API_URL);
export const crearGenero = (genero) => axios.post(API_URL, genero);
export const actualizarGenero = (id, genero) => axios.put(`${API_URL}/${id}`, genero);
export const eliminarGenero = (id) => axios.delete(`${API_URL}/${id}`);
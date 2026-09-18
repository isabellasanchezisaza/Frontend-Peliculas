import axios from 'axios';

const API_URL = 'http://localhost:3000/productoras';

export const obtenerProductoras = () => axios.get(API_URL);
export const crearProductora = (productora) => axios.post(API_URL, productora);
export const actualizarProductora = (id, productora) => axios.put(`${API_URL}/${id}`, productora);
export const eliminarProductora = (id) => axios.delete(`${API_URL}/${id}`);
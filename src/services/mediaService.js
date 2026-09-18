import axios from 'axios';

const API_URL = 'http://localhost:3000/medias';

export const obtenerMedias = () => axios.get(API_URL);
export const crearMedia = (media) => axios.post(API_URL, media);
export const actualizarMedia = (id, media) => axios.put(`${API_URL}/${id}`, media);
export const eliminarMedia = (id) => axios.delete(`${API_URL}/${id}`);
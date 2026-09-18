import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { obtenerGeneros, crearGenero, actualizarGenero, eliminarGenero } from '../services/generoService';

function Genero() {
  const [generos, setGeneros] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [editandoId, setEditandoId] = useState(null);

  // Se ejecuta una vez, al cargar la pantalla
  useEffect(() => {
    cargarGeneros();
  }, []);

  const cargarGeneros = async () => {
    try {
      const respuesta = await obtenerGeneros();
      setGeneros(respuesta.data);
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudieron cargar los géneros', 'error');
    }
  };

  const limpiarFormulario = () => {
    setNombre('');
    setDescripcion('');
    setEstado('Activo');
    setEditandoId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // evita que la página recargue al enviar el form

    const genero = { nombre, descripcion, estado };

    try {
      if (editandoId) {
        await actualizarGenero(editandoId, genero);
        Swal.fire('Actualizado', 'El género fue actualizado', 'success');
      } else {
        await crearGenero(genero);
        Swal.fire('Creado', 'El género fue creado', 'success');
      }
      limpiarFormulario();
      cargarGeneros(); // recarga la tabla con los datos actualizados
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo guardar el género', 'error');
    }
  };

  const handleEditar = (genero) => {
    setNombre(genero.nombre);
    setDescripcion(genero.descripcion);
    setEstado(genero.estado);
    setEditandoId(genero._id); // Mongo usa _id como identificador
  };

  const handleEliminar = async (id) => {
    const confirmacion = await Swal.fire({
      title: '¿Estás segura?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmacion.isConfirmed) {
      try {
        await eliminarGenero(id);
        Swal.fire('Eliminado', 'El género fue eliminado', 'success');
        cargarGeneros();
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'No se pudo eliminar el género', 'error');
      }
    }
  };

  return (
    <div>
      <h2>Géneros</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">
              {editandoId ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </div>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {generos.map((g) => (
            <tr key={g._id}>
              <td>{g.nombre}</td>
              <td>{g.descripcion}</td>
              <td>{g.estado}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditar(g)}>
                  Editar
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(g._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Genero;
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { obtenerDirectores, crearDirector, actualizarDirector, eliminarDirector } from '../services/directorService';

function Director() {
  const [directores, setDirectores] = useState([]);
  const [nombres, setNombres] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    cargarDirectores();
  }, []);

  const cargarDirectores = async () => {
    try {
      const respuesta = await obtenerDirectores();
      setDirectores(respuesta.data);
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudieron cargar los directores', 'error');
    }
  };

  const limpiarFormulario = () => {
    setNombres('');
    setEstado('Activo');
    setEditandoId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const director = { nombres, estado };

    try {
      if (editandoId) {
        await actualizarDirector(editandoId, director);
        Swal.fire('Actualizado', 'El director fue actualizado', 'success');
      } else {
        await crearDirector(director);
        Swal.fire('Creado', 'El director fue creado', 'success');
      }
      limpiarFormulario();
      cargarDirectores();
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo guardar el director', 'error');
    }
  };

  const handleEditar = (director) => {
    setNombres(director.nombres);
    setEstado(director.estado);
    setEditandoId(director._id);
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
        await eliminarDirector(id);
        Swal.fire('Eliminado', 'El director fue eliminado', 'success');
        cargarDirectores();
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'No se pudo eliminar el director', 'error');
      }
    }
  };

  return (
    <div>
      <h2>Directores</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Nombres"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          <div className="col-md-3">
            <button type="submit" className="btn btn-primary w-100">
              {editandoId ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </div>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {directores.map((d) => (
            <tr key={d._id}>
              <td>{d.nombres}</td>
              <td>{d.estado}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditar(d)}>
                  Editar
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(d._id)}>
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

export default Director;
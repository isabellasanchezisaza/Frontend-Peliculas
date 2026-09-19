import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { obtenerTipos, crearTipo, actualizarTipo, eliminarTipo } from "../services/tipoService.js";

export function Tipo() {
  const [tipos, setTipos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [editarId, setEditarId] = useState(null);

  useEffect(() => {
    listarTipos();
  }, []);

  const listarTipos = async () => {
    try {
      const res = await obtenerTipos();
      setTipos(res.data?.tipos || res.data || []);
    } catch (error) {
      console.error(error);
      setTipos([]);
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron cargar los tipos.',
        icon: 'error',
        background: '#181a24',
        color: '#f3f4f6'
      });
    }
  };

  const guardar = async (e) => {
    e.preventDefault();
    const data = { nombre, descripcion };

    try {
      if (editarId) {
        await actualizarTipo(editarId, data);
        Swal.fire({
          title: 'Actualizado',
          text: 'El tipo ha sido actualizado.',
          icon: 'success',
          background: '#181a24',
          color: '#f3f4f6',
          confirmButtonColor: '#8b5cf6'
        });
      } else {
        await crearTipo(data);
        Swal.fire({
          title: 'Guardado',
          text: 'El tipo ha sido creado con éxito.',
          icon: 'success',
          background: '#181a24',
          color: '#f3f4f6',
          confirmButtonColor: '#8b5cf6'
        });
      }

      limpiarFormulario();
      listarTipos();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo guardar el tipo.',
        icon: 'error',
        background: '#181a24',
        color: '#f3f4f6'
      });
    }
  };

  const handleEditar = (item) => {
    setEditarId(item._id || item.id);
    setNombre(item.nombre);
    setDescripcion(item.descripcion || '');
  };

  const handleEliminar = async (id) => {
    const confirma = await Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8b5cf6',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#181a24',
      color: '#f3f4f6'
    });

    if (confirma.isConfirmed) {
      try {
        await eliminarTipo(id);
        Swal.fire({
          title: 'Eliminado',
          text: 'El tipo ha sido eliminado.',
          icon: 'success',
          background: '#181a24',
          color: '#f3f4f6',
          confirmButtonColor: '#8b5cf6'
        });

        listarTipos();
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar el tipo.',
          icon: 'error',
          background: '#181a24',
          color: '#f3f4f6'
        });
      }
    }
  };

  const limpiarFormulario = () => {
    setNombre('');
    setDescripcion('');
    setEditarId(null);
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="fw-bold mb-0 text-white">Gestión de Tipos</h2>
        <span className="badge bg-secondary px-3 py-2 fs-6">
          Total: {tipos?.length || 0}
        </span>
      </div>

      <div className="card cinema-card shadow-lg mb-5">
        <div className="card-header cinema-header py-3">
          <h5 className="card-title mb-0 text-white">
            {editarId ? 'Editar Tipo' : 'Agregar Nuevo Tipo'}
          </h5>
        </div>
        <div className="card-body p-4">
          <form onSubmit={guardar}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label text-light fw-semibold">Nombre</label>
                <input
                  type="text"
                  className="form-control cinema-input text-white"
                  placeholder="Ej. Película, Serie..."
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-light fw-semibold">Descripción</label>
                <input
                  type="text"
                  className="form-control cinema-input text-white"
                  placeholder="Ej. Largometraje de ficción..."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-4 d-flex gap-2">
              <button type="submit" className="btn btn-purple px-4 shadow-sm">
                {editarId ? 'Actualizar' : 'Agregar'}
              </button>
              {editarId && (
                <button
                  type="button"
                  className="btn btn-outline-light px-4"
                  onClick={limpiarFormulario}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="card cinema-card shadow-lg overflow-hidden">
        <div className="table-responsive">
          <table className="table table-dark cinema-table align-middle mb-0">
            <thead>
              <tr>
                <th className="py-3 ps-4 text-white">Nombre</th>
                <th className="py-3 text-white">Descripción</th>
                <th className="py-3 text-center text-white">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {!Array.isArray(tipos) || tipos.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-5 text-muted">
                    No hay tipos registrados aún.
                  </td>
                </tr>
              ) : (
                tipos.map((item) => (
                  <tr key={item._id || item.id}>
                    <td className="ps-4 fw-medium text-white">
                      <span className="badge bg-dark border border-secondary me-2">
                        TIPO
                      </span>
                      {item.nombre}
                    </td>
                    <td className="text-white">
                      {item.descripcion || 'Sin descripción'}
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-warning me-2"
                        onClick={() => handleEditar(item)}
                      >
                        ✏️ Editar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleEliminar(item._id || item.id)}
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Tipo;
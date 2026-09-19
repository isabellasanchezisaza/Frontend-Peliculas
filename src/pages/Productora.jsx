import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { obtenerProductoras, crearProductora, actualizarProductora, eliminarProductora } from "../services/productoraService.js";

export function Productora() {
  const [productoras, setProductoras] = useState([]);
  const [nombre, setNombre] = useState('');
  const [slogan, setSlogan] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [editarId, setEditarId] = useState(null);

  useEffect(() => {
    listarProductoras();
  }, []);

  const listarProductoras = async () => {
    try {
      const res = await obtenerProductoras();
      setProductoras(res.data?.productoras || res.data || []);
    } catch (error) {
      console.error(error);
      setProductoras([]);
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron cargar las productoras.',
        icon: 'error',
        background: '#181a24',
        color: '#f3f4f6'
      });
    }
  };

  const guardar = async (e) => {
    e.preventDefault();
    const data = { nombre, slogan, descripcion, estado };

    try {
      if (editarId) {
        await actualizarProductora(editarId, data);
        Swal.fire({
          title: 'Actualizado',
          text: 'La productora ha sido actualizada.',
          icon: 'success',
          background: '#181a24',
          color: '#f3f4f6',
          confirmButtonColor: '#8b5cf6'
        });
      } else {
        await crearProductora(data);
        Swal.fire({
          title: 'Guardado',
          text: 'La productora ha sido creada con éxito.',
          icon: 'success',
          background: '#181a24',
          color: '#f3f4f6',
          confirmButtonColor: '#8b5cf6'
        });
      }

      limpiarFormulario();
      listarProductoras();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo guardar la productora.',
        icon: 'error',
        background: '#181a24',
        color: '#f3f4f6'
      });
    }
  };

  const handleEditar = (item) => {
    setEditarId(item._id || item.id);
    setNombre(item.nombre);
    setSlogan(item.slogan || '');
    setDescripcion(item.descripcion || '');
    setEstado(item.estado || 'Activo');
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
        await eliminarProductora(id);
        Swal.fire({
          title: 'Eliminado',
          text: 'La productora ha sido eliminada.',
          icon: 'success',
          background: '#181a24',
          color: '#f3f4f6',
          confirmButtonColor: '#8b5cf6'
        });

        listarProductoras();
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar la productora.',
          icon: 'error',
          background: '#181a24',
          color: '#f3f4f6'
        });
      }
    }
  };

  const limpiarFormulario = () => {
    setNombre('');
    setSlogan('');
    setDescripcion('');
    setEstado('Activo');
    setEditarId(null);
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="fw-bold mb-0 text-white">Gestión de Productoras</h2>
        <span className="badge bg-secondary px-3 py-2 fs-6">
          Total: {productoras?.length || 0}
        </span>
      </div>

      <div className="card cinema-card shadow-lg mb-5">
        <div className="card-header cinema-header py-3">
          <h5 className="card-title mb-0 text-white">
            {editarId ? 'Editar Productora' : 'Agregar Nueva Productora'}
          </h5>
        </div>
        <div className="card-body p-4">
          <form onSubmit={guardar}>
            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label text-light fw-semibold">Nombre</label>
                <input
                  type="text"
                  className="form-control cinema-input text-white"
                  placeholder="Ej. Warner Bros..."
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label text-light fw-semibold">Slogan</label>
                <input
                  type="text"
                  className="form-control cinema-input text-white"
                  placeholder="Ej. Descubre grandes historias..."
                  value={slogan}
                  onChange={(e) => setSlogan(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label text-light fw-semibold">Descripción</label>
                <input
                  type="text"
                  className="form-control cinema-input text-white"
                  placeholder="Ej. Estudio cinematográfico..."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <label className="form-label text-light fw-semibold">Estado</label>
                <select
                  className="form-select cinema-input text-white"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
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
                <th className="py-3 text-white">Slogan</th>
                <th className="py-3 text-white">Descripción</th>
                <th className="py-3 text-center text-white">Estado</th>
                <th className="py-3 text-center text-white">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {!Array.isArray(productoras) || productoras.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    No hay productoras registradas aún.
                  </td>
                </tr>
              ) : (
                productoras.map((item) => (
                  <tr key={item._id || item.id}>
                    <td className="ps-4 fw-medium text-white">
                      <span className="badge bg-dark border border-secondary me-2">
                        PROD
                      </span>
                      {item.nombre}
                    </td>
                    <td className="text-white">
                      {item.slogan || 'Sin slogan'}
                    </td>
                    <td className="text-white">
                      {item.descripcion || 'Sin descripción'}
                    </td>
                    <td className="text-center">
                      <span className={`badge ${item.estado === 'Inactivo' ? 'bg-danger' : 'bg-success'}`}>
                        {item.estado || 'Activo'}
                      </span>
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

export default Productora;
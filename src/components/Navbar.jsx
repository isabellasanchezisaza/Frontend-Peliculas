import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">Menú</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/generos">Géneros</Link>
          <Link className="nav-link" to="/directores">Directores</Link>
          <Link className="nav-link" to="/productoras">Productoras</Link>
          <Link className="nav-link" to="/tipos">Tipos</Link>
          <Link className="nav-link" to="/media">Películas y Series</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
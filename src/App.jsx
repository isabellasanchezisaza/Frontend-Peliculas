import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Genero from './pages/Genero';
import Director from './pages/Director';
import Productora from './pages/Productora';
import Tipo from './pages/Tipo';
import Media from './pages/Media';
import './App.css'; //  Se cargan los estilos del menú y componentes aquí

function App() {
  return (
    <>
      <Navbar />
      <div className="container pb-5">
        <Routes>
          <Route 
            path="/" 
            element={
              <div className="text-center py-5">
                <div className="card cinema-card p-5 shadow-lg max-w-lg mx-auto">
                  <h1 className="display-5 fw-bold text-white mb-3">
                    🎬 Panel de Control
                  </h1>
                  <p className="text-light fs-5 mb-0">
                    Selecciona una opción del menú superior para administrar el catálogo.
                  </p>
                </div>
              </div>
            } 
          />
          <Route path="/generos" element={<Genero />} />
          <Route path="/directores" element={<Director />} />
          <Route path="/productoras" element={<Productora />} />
          <Route path="/tipos" element={<Tipo />} />
          <Route path="/media" element={<Media />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
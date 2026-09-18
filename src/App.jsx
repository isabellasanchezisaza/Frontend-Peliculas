import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Genero from './pages/Genero';
import Director from './pages/Director';
import Productora from './pages/Productora';
import Tipo from './pages/Tipo';
import Media from './pages/Media';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<h2>Bienvenido, selecciona un módulo</h2>} />
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
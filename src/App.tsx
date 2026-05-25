import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/Home'
import DragonDetail from './pages/DragonDetail'
import Favorites from './pages/Favorites'
import NotFoundPage from './pages/notfound'
import { useFavorites } from "./context/FavoritesContext";

function App() {
  const { favorites } = useFavorites();
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="p-4 flex gap-4 bg-slate-800">
        <Link to="/">Inicio</Link>

        <Link to="/favorites">
          Favoritos ({favorites.length})
        </Link>
    </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/Dragon/:id" element={<DragonDetail />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App


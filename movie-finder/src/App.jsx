import React, { useState, useEffect } from 'react';
import { MovieProvider, useMovies } from './context/MovieContext';
import MovieCard from './components/MovieCard';
import FavoritesSidebar from './components/FavoritesSidebar';

// Tu clave de API de OMDb 100% activa

const API_KEY = "4256007e"; 

function MainLayout() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('Marvel');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const { favorites } = useMovies();

  // Función de búsqueda corregida a la perfección
  const fetchMovies = async (title) => {
    if (!title.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(title)}&apikey=${API_KEY}`);
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error || "No se encontraron resultados");
      }
    } catch (err) {
      setError("Error de conexión. Inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  // Efecto inicial automático con corchetes de dependencia simples []
  useEffect(() => {
    fetchMovies('Marvel');
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMovies(searchTerm);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans antialiased">
      {/* Navbar Premium */}
      <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 py-4 sticky top-0 z-30 shadow-xl">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">
            🎬 MOVIE<span className="text-white">FINDER</span>
          </h1>
          
          <div className="w-full sm:w-auto flex items-center gap-4">
            <form onSubmit={handleSearchSubmit} className="w-full sm:w-80 flex gap-2">
              <input
                type="text"
                placeholder="Buscar películas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-sm"
              />
            </form>

            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="relative bg-gray-800 hover:bg-gray-700 border border-gray-700 p-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium text-sm whitespace-nowrap"
            >
              ⭐ Ver Favoritos
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-gray-950 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="container mx-auto px-4 py-8">
        {loading && (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        )}

        {error && !loading && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center max-w-md mx-auto my-12 shadow-lg">
            <span className="text-4xl">🔍</span>
            <p className="text-gray-300 font-semibold mt-4">{error}</p>
            <p className="text-gray-500 text-sm mt-1">Prueba refinando los términos de búsqueda.</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}
      </main>

      {/* Sidebar de Favoritos */}
      <FavoritesSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <MovieProvider>
      <MainLayout />
    </MovieProvider>
  );
}

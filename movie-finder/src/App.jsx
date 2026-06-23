import React, { useState } from 'react';

// 1. Datos falsos (Mock Data) para probar el diseño antes de conectar la API
const MOCK_MOVIES = [
  {
    imdbID: "1",
    Title: "Inception",
    Year: "2010",
    Poster: "https://unsplash.com"
  },
  {
    imdbID: "2",
    Title: "The Dark Knight",
    Year: "2008",
    Poster: "https://unsplash.com"
  },
  {
    imdbID: "3",
    Title: "Interstellar",
    Year: "2014",
    Poster: "https://unsplash.com"
  }
];

// 2. Componente de la Tarjeta de Película
function MovieCard({ movie }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200">
      <img 
        src={movie.Poster} 
        alt={movie.Title} 
        className="w-full h-80 object-cover"
      />
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg truncate">{movie.Title}</h3>
        <p className="text-gray-400 text-sm mt-1">{movie.Year}</p>
        <button className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-1.5 px-4 rounded transition-colors text-sm">
          Añadir a Favoritos
        </button>
      </div>
    </div>
  );
}

// 3. Componente Principal App
export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      {/* Encabezado */}
      <header className="bg-gray-900 border-b border-gray-800 py-6 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-red-500 tracking-wider">
            🎬 MOVIE<span className="text-white">FINDER</span>
          </h1>
          
          {/* Barra de Búsqueda */}
          <div className="w-full sm:w-96 flex gap-2">
            <input
              type="text"
              placeholder="Busca una película (Ej: Batman)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2 rounded transition-colors">
              Buscar
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-6 text-gray-300">
          {searchTerm ? `Resultados para: "${searchTerm}"` : 'Películas Destacadas'}
        </h2>

        {/* Grilla de Películas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {MOCK_MOVIES.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      </main>
    </div>
  );
}

import React from 'react';
import { useMovies } from '../context/MovieContext';

export default function FavoritesSidebar({ isOpen, onClose }) {
    const { favorites, toggleFavorite } = useMovies();

    return (
        <>
            {/* Fondo oscuro traslúcido al abrir el menú */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity" onClick={onClose} />
            )}

            {/* Contenedor del Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-gray-900 border-l border-gray-800 shadow-2xl z-50 p-6 overflow-y-auto transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        ⭐ Mis Favoritos ({favorites.length})
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl font-semibold focus:outline-none">
                        &times;
                    </button>
                </div>

                {favorites.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <p className="text-lg">Tu lista está vacía.</p>
                        <p className="text-xs mt-1">Explora películas y añade tus preferidas.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {favorites.map((movie) => (
                            <div key={movie.imdbID} className="flex gap-3 bg-gray-800/60 p-3 rounded-lg border border-gray-700/30 items-center justify-between">
                                <div className="flex gap-3 items-center min-w-0">
                                    <img src={movie.Poster !== "N/A" ? movie.Poster : "https://placeholder.com"} alt={movie.Title} className="w-12 h-16 object-cover rounded shadow" />
                                    <div className="min-w-0">
                                        <h4 className="text-white font-medium text-sm truncate">{movie.Title}</h4>
                                        <p className="text-gray-400 text-xs mt-0.5">{movie.Year}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleFavorite(movie)}
                                    className="text-red-400 hover:text-red-500 text-sm font-medium p-1 hover:bg-red-500/10 rounded transition-colors"
                                    title="Eliminar"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

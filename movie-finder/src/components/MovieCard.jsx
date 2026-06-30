import React, { useState } from 'react';
import { useMovies } from '../context/MovieContext';

export default function MovieCard({ movie }) {
    const { favorites, toggleFavorite } = useMovies();
    const [imageError, setImageError] = useState(false);

    const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

    // URL de placeholder mejorada
    const placeholderUrl = "https://via.placeholder.com/300x450?text=No+Poster&bg=1F2937&txtclr=6B7280&font=Raleway";
    
    const posterUrl = movie.Poster && movie.Poster !== "N/A" && !imageError
        ? movie.Poster
        : placeholderUrl;

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700/50 hover:border-red-500/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col h-full">
            {/* Poster Image Container */}
            <div className="relative group overflow-hidden bg-gray-700">
                <img
                    src={posterUrl}
                    alt={movie.Title}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={handleImageError}
                    loading="lazy"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                
                {/* Favorite indicator */}
                {isFavorite && (
                    <div className="absolute top-3 right-3 bg-amber-500 text-gray-950 rounded-full p-2 shadow-lg">
                        ⭐
                    </div>
                )}

                {/* Tipo de contenido */}
                {movie.Type && (
                    <div className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        <span className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
                            {movie.Type}
                        </span>
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className="p-4 flex flex-col flex-grow justify-between gap-4">
                <div>
                    <h3 
                        className="text-white font-bold text-base line-clamp-2 mb-2 leading-tight" 
                        title={movie.Title}
                    >
                        {movie.Title}
                    </h3>
                    <span className="inline-block px-2.5 py-1 bg-gray-700 text-gray-300 text-xs rounded-full font-medium hover:bg-gray-600 transition-colors">
                        📅 {movie.Year}
                    </span>
                </div>

                {/* Favorite Button */}
                <button
                    onClick={() => toggleFavorite(movie)}
                    className={`w-full font-semibold py-2.5 px-4 rounded-lg transition-all duration-250 text-sm flex items-center justify-center gap-2 active:scale-95 ${
                        isFavorite
                            ? 'bg-amber-500 hover:bg-amber-600 text-gray-950 shadow-md hover:shadow-lg'
                            : 'bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg'
                    }`}
                >
                    {isFavorite ? '⭐ En Favoritos' : '➕ Añadir a Favoritos'}
                </button>
            </div>
        </div>
    );
}
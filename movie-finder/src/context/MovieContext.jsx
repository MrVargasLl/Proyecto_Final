import React, { createContext, useState, useEffect, useContext } from 'react';

const MovieContext = createContext();

export function MovieProvider({ children }) {
    // Inicializa los favoritos leyendo desde localStorage
    const [favorites, setFavorites] = useState(() => {
        const localData = localStorage.getItem('movie_favorites');
        return localData ? JSON.parse(localData) : [];
    });

    // Sincroniza automáticamente los favoritos con localStorage cada vez que cambien
    useEffect(() => {
        localStorage.setItem('movie_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (movie) => {
        setFavorites((prevFavorites) => {
            const isAlreadyFav = prevFavorites.some((fav) => fav.imdbID === movie.imdbID);
            if (isAlreadyFav) {
                return prevFavorites.filter((fav) => fav.imdbID !== movie.imdbID);
            } else {
                return [...prevFavorites, movie];
            }
        });
    };

    return (
        <MovieContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </MovieContext.Provider>
    );
}

// Hook personalizado para usar el contexto de forma limpia
export function useMovies() {
    return useContext(MovieContext);
}

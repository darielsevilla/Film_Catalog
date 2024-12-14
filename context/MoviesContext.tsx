// MoviesContext.js
import React, { createContext, useState, useEffect,Dispatch, SetStateAction, ReactNode } from 'react';
type movies = {
    id: string,
    title: string,
    poster_path: string,
    release_date: string,
    vote_average: string
}

type MovieType = {
    favorites : movies[]
    setFavorites : Dispatch<SetStateAction<movies[]>>
}
export const MoviesContext = createContext<MovieType>({
    favorites: [],
    setFavorites: () =>[]
});
interface prop { 
    children: ReactNode

};
export const FavoriteMovies = ({ children} :prop) => {
    const [favorites, setFavorites] = useState<movies[]>([]);
    return (
        <MoviesContext.Provider value={{ favorites, setFavorites }}>
            {children}
        </MoviesContext.Provider>
    );
};

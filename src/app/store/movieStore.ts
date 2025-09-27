import { create } from "zustand";

type Movie = {
  id: number;
  name: string;
  summary: string;
  genres: string[];
  premiered?: string;
  rating?: {
    average: number | null;
  };
  image?: {
    medium?: string;
    original?: string;
  };
};

type MovieState = {
  movies: Movie[];
  addMovie: (movie: Movie) => void;
  deleteMovie: (id: number) => void;
  clearMovie: () => void;
};

const useMovies = create<MovieState>((set) => ({
  movies: [],
  addMovie: (movie) =>
    set((state) => {
      const exists = state.movies.some((m) => m.id === movie.id);
      if (exists) return state;

      return {
        movies: [...state.movies, movie],
      };
    }),
  deleteMovie: (id: number) =>
    set((state) => ({
      movies: state.movies.filter((m) => m.id !== id),
    })),

  clearMovie: () => set({ movies: [] }),
}));

export default useMovies;

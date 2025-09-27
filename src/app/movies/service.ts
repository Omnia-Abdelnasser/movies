import axios from "axios";

export type Movies = {
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

const URL = "https://api.tvmaze.com/shows";

//get all movies
export async function getMovies(): Promise<Movies[]> {
  const res = await axios.get<Movies[]>(URL);
  return res.data;
}
// Get movie by id
export async function getMovie(id: number): Promise<Movies | undefined> {
  const res = await axios.get<Movies[]>(URL);
  const movies: Movies[] = res.data;
  return movies.find((m) => m.id === id);
}

"use client";
import { useQuery } from "@tanstack/react-query";
import { getMovie, getMovies, Movies } from "./service";
// get all movies
export const UseMovies = () => {
  return useQuery<Movies[]>({
    queryKey: ["movies"],
    queryFn: getMovies,
  });
};

//get movie byId
export const UseGetMovies = (id: number) => {
  return useQuery<Movies | undefined>({
    queryKey: ["movies", id],
    queryFn: () => getMovie(id),
    enabled: !!id,
  });
};

"use client";
import { useState } from "react";
import { UseMovies } from "@/app/movies/hook";
import useMovies from "@/app/store/movieStore";
import Navbar from "@/app/component/navbar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

const Movies = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { data: movies, isLoading, isError, error } = UseMovies();
  const addmovies = useMovies((state) => state.addMovie);

  if (isLoading) return <h2 className="text-2xl text-center">Loading....</h2>;
  if (isError)
    return (
      <h2 className="text-2xl text-center text-red-500">
        Error: {(error as Error).message}
      </h2>
    );

  const filterMovie = movies?.filter((movie) =>
    movie.name.toLowerCase().includes(search.toLowerCase()),
  );
  if (!filterMovie?.length)
    return <h2 className="text-xl text-center">There are no films</h2>;

  // pagination logic
  const totalPages = Math.ceil(filterMovie.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const currentMovies = filterMovie.slice(start, start + itemsPerPage);

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />

      <main className="p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentMovies.map((movie) => (
          <div
            key={movie.id}
            className="rounded-2xl shadow-md border bg-white flex flex-col overflow-hidden"
          >
            <div className="relative w-full h-72">
              <Image
                src={movie.image?.medium || "/placeholder.jpg"}
                alt={movie.name}
                className="object-cover w-full h-full"
                width={300}
                height={450}
              />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-lg font-semibold">{movie.name}</h2>
              <div className="flex gap-2 mt-auto">
                <Link
                  href={`/movies/${movie.id}`}
                  className="w-full bg-blue-600 text-white text-sm px-3 py-1 rounded-full text-center hover:bg-blue-700"
                >
                  View
                </Link>
                <button
                  onClick={() => {
                    addmovies(movie);
                    toast.success("Movie added to favorites");
                  }}
                  className="w-full bg-red-400 text-white text-sm px-3 py-1 rounded-full hover:bg-red-500"
                >
                  Fav
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* pagination */}
      <div className="flex justify-center mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            <PaginationItem>
              <span className="px-3 py-1 text-sm">
                Page {currentPage} of {totalPages}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default Movies;

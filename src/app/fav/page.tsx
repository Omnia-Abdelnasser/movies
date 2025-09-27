"use client";
import useMovies from "@/app/store/movieStore";
import Image from "next/image";

export const metadata = {
  title: "Favorite Movies",
  description: "Your favorite movies list",
};

const FavMovies = () => {
  const favMovies = useMovies((state) => state.movies);
  const deleteMovie = useMovies((state) => state.deleteMovie);

  if (!favMovies.length) {
    return (
      <h2 className="text-xl text-center mt-10 text-gray-500">
        No favorite movies yet 🎬
      </h2>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Favorite Movies ❤️</h1>

      <main className="p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favMovies.map((movie) => (
          <div
            key={movie.id}
            className="rounded-2xl shadow-md border bg-white hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
          >
            <div className="relative w-full h-72 overflow-hidden">
              <Image
                src={movie.image?.medium || "/placeholder.jpg"}
                alt={movie.name}
                width={300}
                height={450}
                className="object-cover w-full h-full rounded-t-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-lg font-semibold line-clamp-1 mb-3">
                {movie.name}
              </h2>

              <div className="flex flex-row gap-2 text-center">
                <a
                  href={`/movies/${movie.id}`}
                  className="flex-1 bg-blue-600 text-white text-sm px-3 py-2 rounded-full hover:bg-blue-700 transition"
                >
                  View Details
                </a>
                <button
                  onClick={() => deleteMovie(movie.id)}
                  className="flex-1 bg-red-500 text-white text-sm px-3 py-2 rounded-full hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default FavMovies;

"use client";
import { useParams, useRouter } from "next/navigation";
import { UseGetMovies } from "@/app/movies/hook";
import Image from "next/image";

export const metadata = {
  title: "Movie Details",
  description: "Detailed view of the selected movie",
};
const MovieDetails = () => {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id)
    ? Number(params.id[0])
    : Number(params.id);
  const { data: movie, isLoading, isError, error } = UseGetMovies(id);

  if (isLoading)
    return <h2 className="text-2xl text-center mt-10">Loading....</h2>;

  if (isError)
    return (
      <h2 className="text-2xl text-center text-red-500 mt-10">
        Error: {(error as Error).message}
      </h2>
    );

  if (!movie)
    return <h2 className="text-center mt-10 text-xl">Movie not found</h2>;

  return (
    <main className="p-6 max-w-5xl mx-auto mt-10">
      <div className="grid md:grid-cols-2 gap-8 bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={movie.image?.original || "/placeholder.jpg"}
            alt={movie.name || "Movie Poster"}
            width={600}
            height={800}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="p-6 flex flex-col">
          <h1 className="text-4xl font-bold mb-4 text-blue-700">
            {movie.name}
          </h1>

          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres?.map((genre: string, index: number) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {genre}
              </span>
            ))}
          </div>

          <p
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: movie.summary }}
          />

          <div className="">
            <p className="text-sm text-gray-500">
              Premiered:{" "}
              <span className="font-semibold">{movie.premiered || "N/A"}</span>
            </p>
            <p className="text-sm text-gray-500">
              Rating:{" "}
              <span className="font-semibold">
                {movie.rating?.average || "N/A"}
              </span>
            </p>
          </div>
          <button
            onClick={() => router.push("/movies")}
            className="mt-4 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            ← Back to Movies
          </button>
        </div>
      </div>
    </main>
  );
};

export default MovieDetails;

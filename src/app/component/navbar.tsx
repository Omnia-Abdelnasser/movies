"use client";

import { Dispatch, SetStateAction } from "react";
import { Heart } from "lucide-react";
import useMovies from "@/app/store/movieStore";
import { Input } from "@/components/ui/input";
import Link from "next/link";

type Props = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

const Navbar = ({ search, setSearch }: Props) => {
  const countMovies = useMovies((state) => state.movies.length);
  return (
    <>
      <nav className="bg-gray-50 border-b border-gray-200 w-full">
        <div className="w-full mx-auto flex items-center justify-between p-4">
          <h2 className="text-2xl font-bold text-gray-800">Movies</h2>

          <div className="flex items-center gap-10">
            <Input
              type="text"
              placeholder="Search..."
              className="px-7 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link href="/fav">
              <button className="relative text-red-500 hover:text-red-600 transition text-2xl">
                <Heart className="w-6 h-6" />
                <span
                  className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold 
              w-5 h-5 flex items-center justify-center rounded-full"
                >
                  {countMovies}
                </span>
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;

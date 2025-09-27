import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-lg mt-4">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to Movies
      </Link>
    </main>
  );
}

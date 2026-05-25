import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10 text-center">
      <h1 className="text-4xl font-bold">404</h1>

      <p className="mt-4 text-slate-300">
        Página no encontrada
      </p>

      <div className="mt-6">
        <Link
          to="/"
          className="text-blue-400 hover:underline"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
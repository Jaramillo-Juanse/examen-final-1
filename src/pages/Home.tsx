import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import DragonList from "../components/DragonList";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";
import { fetchDragons } from "../services/DragonService";
import type { Dragon } from "../types";
import { FaDragon } from "react-icons/fa";


export default function Homepage() {
  const [dragons, setDragons] =
    useState<Dragon[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  async function loadDragons() {
    try {
      setLoading(true);
      setError("");

      const data =
        await fetchDragons();

      setDragons(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDragons();
  }, []);

  const filteredDragons =
    dragons.filter((dragon) =>
      dragon.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  if (loading) return <Loader />;

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={loadDragons}
      />
    );
  }

  if (dragons.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">
        <FaDragon/> DragonDex
      </h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      {filteredDragons.length === 0 ? (
        <EmptyState />
      ) : (
        <DragonList
          dragons={filteredDragons}
        />
      )}
    </div>
  );
}
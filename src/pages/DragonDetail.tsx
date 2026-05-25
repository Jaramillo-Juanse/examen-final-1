import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

import { fetchDragons } from "../services/DragonService";
import { useFavorites } from "../context/FavoritesContext";
import type { Dragon } from "../types";

import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

function DragonDetail() {
  const { id } = useParams();

  const [dragon, setDragon] =
    useState<Dragon | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const {
    addFavorite,
    removeFavorite,
    isFavorite,
  } = useFavorites();

  async function loadDragon() {
    try {
      setLoading(true);
      setError("");

      const dragons = await fetchDragons();

      const foundDragon = dragons.find(
        (item) =>
          item.id === Number(id)
      );

      setDragon(foundDragon || null);
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
    loadDragon();
  }, [id]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={loadDragon}
      />
    );
  }

  if (!dragon) return <EmptyState />;

const currentDragon = dragon;

const favorite = isFavorite(currentDragon.id);

function handleFavorite() {
  if (favorite) {
    removeFavorite(currentDragon.id);
  } else {
    addFavorite(currentDragon);
  }
}
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link
        to="/"
        className="text-blue-400"
      >
        ← Volver
      </Link>

      <h1 className="text-4xl mt-4 mb-4 capitalize">
        {dragon.name}
      </h1>

          <img
        width="400"
        height="400"  
        src={dragon.image}
        alt={dragon.name}/>

      <ul className="list-disc pl-6 mb-4 text-gray-200">
        <li>
          <strong>Elemento(s):</strong>{" "}
            <span className="capitalize">{dragon.element}</span>
        </li>
        <li className="capitalize">
          <strong>Habilidad:</strong>{" "}
          {dragon.ability}
        </li>
        <li>
          <strong>Nivel:</strong>{" "}
          {dragon.powerLevel}
        </li>
        <li>
          <strong>HP:</strong>{" "}
          {dragon.hp}
        </li>
        <li>
          <strong>Ataque:</strong>{" "}
          {dragon.attack}
        </li>
        <li>
          <strong>Defensa:</strong>{" "}
          {dragon.defense}  
        </li>
      </ul>
      
      

      <button
        onClick={handleFavorite}
        className="text-red-500 text-2xl"
      >
        <FaHeart
          className={
            favorite
              ? "fill-red-500"
              : "fill-gray-400"
          }
        />
      </button>
    </div>
  );
}

export default DragonDetail;
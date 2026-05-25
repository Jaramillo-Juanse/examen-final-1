import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useFavorites } from "../context/FavoritesContext";
import type { Dragon } from "../types";

type Props = {
  dragon: Dragon;
};

export default function DragonCard({
  dragon,
}: Props) {
  const {
    addFavorite,
    removeFavorite,
    isFavorite,
  } = useFavorites();

  const favorite = isFavorite(dragon.id);

  function handleFavorite() {
    if (favorite) {
      removeFavorite(dragon.id);
    } else {
      addFavorite(dragon);
    }
  }

  return (
    <div className="bg-slate-800 p-4 rounded shadow">
      <Link to={`/dragon/${dragon.id}`}>
        <h2 className="text-xl font-bold hover:text-yellow-400 capitalize">
          {dragon.name}
        </h2>
      </Link>

                <img
        width="400"
        height="400"  
        src={dragon.image}
        alt={dragon.name}/>

      <p className="text-sm text-gray-300 mt-2">
        {dragon.description}
      </p>

      <button
        onClick={handleFavorite}
        className="mt-4 text-red-500"
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
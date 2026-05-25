import type {
  Dragon,
  PokemonListResponse,
  PokemonDetail,
} from "../types";

const API_URL =
  "https://pokeapi.co/api/v2/pokemon?limit=30";

function PokemonToDragon(
  pokemon: PokemonDetail
): Dragon {
  const elements = pokemon.types
    .map((t) => t.type.name)
    .join(", ");

  const hp =
    pokemon.stats.find(
      (s) => s.stat.name === "hp"
    )?.base_stat || 0;

  const attack =
    pokemon.stats.find(
      (s) => s.stat.name === "attack"
    )?.base_stat || 0;

  const defense =
    pokemon.stats.find(
      (s) => s.stat.name === "defense"
    )?.base_stat || 0;

  return {
    id: pokemon.id,
    name: pokemon.name,
    element: elements,
    ability:
      pokemon.abilities[0].ability.name,
    region: "Mystic Valley",
    powerLevel: attack,
    hp,
    attack,
    defense,
    image:
      pokemon.sprites.other[
        "official-artwork"
      ].front_default,
    description: `Dragón con elemento(s) ${elements}.`,
  };
}

export async function fetchDragons(): Promise<
  Dragon[]
> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Error cargando catálogo de dragones");
  }
  const data: PokemonListResponse =
    await response.json();
    
  const detailPromises = data.results.map(
    async (pokemon) => {
      const res = await fetch(pokemon.url);
      if (!res.ok) {
        throw new Error(
          "Error cargando detalles del dragón"
        );
      }
      const detail: PokemonDetail =
        await res.json();
      return PokemonToDragon(detail);
    }
  );
  return Promise.all(detailPromises);
}
export async function getDragonByName(
  id: number
): Promise<Dragon> {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );
  if (!response.ok) {
    throw new Error(
      "Dragón no encontrado"
    );
  }
  const data: PokemonDetail =
    await response.json();
  return PokemonToDragon(data);
}
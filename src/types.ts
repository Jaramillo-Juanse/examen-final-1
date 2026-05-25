export interface Dragon {
  id: number;
  name: string;
  element: string;
  ability: string;
  region: string;
  powerLevel: number;
  image: string;
  description: string;
  hp: number;
  attack: number;
  defense: number;
}

export type PokemonListResponse = {
  results: {
    name: string;
    url: string;
  }[];
};

export type PokemonDetail = {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
};
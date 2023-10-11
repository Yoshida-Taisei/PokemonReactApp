import axios, { AxiosResponse } from "axios";

// ポケモン名の対応表をロードする
const pokemonNameMapping = require("./pokemon.json");

export interface Pokemon {
  name: string;
  url: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}

// ポケモンのリストを取得する
export async function getPokemonList(
  startingIndex: number,
  count: number
): Promise<Pokemon[]> {
  try {
    const pokemonList: Pokemon[] = [];

    for (let i = startingIndex; i < startingIndex + count; i++) {
      const response: AxiosResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${i}`
      );
      const pokemon: Pokemon = response.data;
      // ポケモン名を翻訳する
      const name_ja = tranceName(pokemon.name);
      console.log(name_ja);
      if (name_ja) {
        pokemon.name = name_ja;
      }

      pokemonList.push(pokemon);
    }

    return pokemonList;
  } catch (error) {
    console.error(
      `ポケモンリストの取得に失敗しました (${startingIndex}-${
        startingIndex + count - 1
      }):`,
      error
    );
    return [];
  }
}

// ポケモン名の対応表から日本語名を取得する
function tranceName(englishName:string) {
  for (const pokemon of pokemonNameMapping) {
      console.log(pokemon.en);
      if (pokemon.en.toLowerCase() === englishName) {
          return pokemon.ja;
      }
  }
  return null; 
}

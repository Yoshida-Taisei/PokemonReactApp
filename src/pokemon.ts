import axios, { AxiosResponse } from 'axios';

export interface Pokemon {
  name: string;
  url: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string; // 公式アートワーク画像のURL
      };
    };
  };
}

// ポケモンの情報を1体取得する
export async function getPokemonByIdOrName(idOrName: string): Promise<Pokemon | null> {
    try {
        const response: AxiosResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
        console.log(response);
        const pokemon: Pokemon = response.data;
        return pokemon;
    } catch (error) {
        console.error(`ポケモンの取得に失敗しました (${idOrName}):`, error);
        return null; 
    }
}

// ポケモンのリストを取得する
export async function getPokemonList(startingIndex: number, count: number): Promise<Pokemon[]> {
    try {
      const pokemonList: Pokemon[] = [];
  
      for (let i = startingIndex; i < startingIndex + count; i++) {
        const response: AxiosResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const pokemon: Pokemon = response.data;
        pokemonList.push(pokemon);
      }
  
      return pokemonList;
    } catch (error) {
      console.error(`ポケモンリストの取得に失敗しました (${startingIndex}-${startingIndex + count - 1}):`, error);
      return [];
    }
  }
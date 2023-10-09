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
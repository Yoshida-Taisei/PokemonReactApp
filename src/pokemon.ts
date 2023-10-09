import axios, { AxiosResponse } from 'axios';

interface Pokemon {
    name: string;
    url: string;
}

// export async function getPokemonList(): Promise<Pokemon[]> {
//     try {
//         const response: AxiosResponse = await axios.get('https://pokeapi.co/api/v2/pokemon/');
//         console.log(response);
//         const pokemonList: Pokemon[] = response.data.results;
//         return pokemonList;
//     } catch (error) {
//         console.error('データの取得に失敗しました: ', error);
//         throw error;
//     }
// }

export async function getPokemonByIdOrName(idOrName: string): Promise<Pokemon | null> {
    try {
        const response: AxiosResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
        console.log(response);
        const pokemon: Pokemon = response.data;
        return pokemon;
    } catch (error) {
        console.error(`ポケモンの取得に失敗しました (${idOrName}):`, error);
        return null; // エラー時にはnullを返すか、エラーハンドリングを行うか選択できます
    }
}
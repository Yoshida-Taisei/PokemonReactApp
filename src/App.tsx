import React, { useState, useEffect } from "react";
import "./App.css";
import { getPokemonList, Pokemon } from "./pokemon";

function App() {
  // ポケモンのリストを格納する state
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const startID = 1;
  const endID = 9;
  useEffect(() => {
    async function fetchPokemonList() {
      try {
        const fetchedPokemonList = await getPokemonList(startID, endID);
        setPokemonList(fetchedPokemonList);
      } catch (error) {
        console.error("ポケモンリストの取得に失敗しました:", error);
      }
    }

    fetchPokemonList();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokemon List</h1>
        <div className="pokemon-grid">
          {pokemonList.map((pokemon, index) => (
            <div className="pokemon-item" key={pokemon.name}>
              <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
                style={{ width: '150px', height: '150px' }} // 幅と高さを調整
              />
              <p>{pokemon.name}</p>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;

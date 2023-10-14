import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes, } from "react-router-dom"; // react-router-dom のインポート

import "./App.css";
import { getPokemonList, Pokemon } from "./pokemon";
import Detail from "./components/Detail";

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
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>ポケモン図鑑</h1>
          <div className="pokemon-grid">
            {pokemonList.map((pokemon) => (
              <div className="pokemon-item" key={pokemon.name}>
                <Link to={`/detail/${pokemon.name}`}>
                  <img
                    src={
                      pokemon.sprites.other["official-artwork"].front_default
                    }
                    alt={pokemon.name}
                    style={{ width: "150px", height: "150px" }}
                  />
                </Link>
                <p>{pokemon.name}</p>
              </div>
            ))}
          </div>
        </header>
        <Routes>
          <Route path="/detail/:pokemonName" element={<Detail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

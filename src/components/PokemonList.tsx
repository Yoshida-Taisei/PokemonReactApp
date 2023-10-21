import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPokemonList, Pokemon } from "../pokemon";

function PokemonList() {
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
    <div className="pokemon-grid">
      {pokemonList.map((pokemon) => (
        <div className="pokemon-item" key={pokemon.name}>
          <Link to={`/detail/${pokemon.id}`}>
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              style={{ width: "150px", height: "150px" }}
            />
          </Link>
          <p>{pokemon.name}</p>
        </div>
      ))}
    </div>
  );
}

export default PokemonList;

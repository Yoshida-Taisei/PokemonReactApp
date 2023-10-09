import React, { useState, useEffect } from 'react';
import './App.css';
import { getPokemonByIdOrName, Pokemon  } from './pokemon';


function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const pokemonId = "25";

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const data = await getPokemonByIdOrName(pokemonId);
        setPokemon(data);
      } catch (e) {
        console.error(e);
      }
    }

    fetchPokemon();
  }, [pokemonId]);

  return (
    <div className="App">
      <header className="App-header">
        {pokemon ? (
          <p>
            <h2>{pokemon.name}</h2>
            {pokemon.sprites.other['official-artwork'].front_default && (
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={`${pokemon.name}`}
              />
            )}
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Detail from "./components/Detail";
import PokemonList from "./components/PokemonList";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>ポケモン図鑑</h1>
        </header>

        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/detail/:pokemonName" element={<Detail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

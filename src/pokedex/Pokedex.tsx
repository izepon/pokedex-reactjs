import React, { useState } from "react";

interface PokedexProps {}

const pokemonsArray: string[] = ["Pikachu", "Scizor", "Umbreon"];

export const Pokedex: React.FC<PokedexProps> = () => {
  const [pokemons, setPokemons] = useState<string[]>(pokemonsArray);
  const [selectedPokemon, setSelectedPokemon] = useState<string | undefined>(
    undefined
  );

  return (
    <div>
      <h1>Pokedex</h1>
      Pokemons:
      {pokemons.map((pokemon) => (
        <button onClick={() => setSelectedPokemon(pokemon)}>{pokemon}</button>
      ))}
      <h2>
        Pokemon selecionado: {selectedPokemon || "Nenhum Pokémon selecionado."}
      </h2>
    </div>
  );
};

export default Pokedex;

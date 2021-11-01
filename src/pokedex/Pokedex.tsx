import axios from "axios";
import React, { useEffect, useState } from "react";
import { getPokemonDetails } from "../pokemon/services/getPokemonDetails";
import { PokemonDetail } from "../pokemon/interfaces/PokemonDetail";
import {
  listPokemon,
  PokemonListInterface,
} from "../pokemon/services/listPokemons";

interface PokedexProps {}

export const Pokedex: React.FC<PokedexProps> = () => {
  const [pokemons, setPokemons] = useState<PokemonListInterface[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<
    PokemonListInterface | undefined
  >(undefined);
  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState<
    PokemonDetail | undefined
  >(undefined);

  useEffect(() => {
    listPokemon().then((response) => setPokemons(response.results));
  }, []);

  useEffect(() => {
    if (!selectedPokemon) return;

    getPokemonDetails(selectedPokemon.name).then((response) =>
      setSelectedPokemonDetails(response)
    );
  }, [selectedPokemon]);

  return (
    <div>
      <h1>Pokedex</h1>
      Pokemons:
      {pokemons.map((pokemon) => (
        <button onClick={() => setSelectedPokemon(pokemon)}>
          {pokemon.name}
        </button>
      ))}
      <h2>
        Pokemon selecionado:{" "}
        {selectedPokemon?.name || "Nenhum Pokémon selecionado."}
      </h2>
      {JSON.stringify(selectedPokemonDetails, undefined, 2)}
    </div>
  );
};

export default Pokedex;

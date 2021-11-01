import React, { useEffect, useState } from "react";
import { getPokemonDetails } from "../pokemon/services/getPokemonDetails";
import { PokemonDetail } from "../pokemon/interfaces/PokemonDetail";
import {
  listPokemon,
  PokemonListInterface,
} from "../pokemon/services/listPokemons";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

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
      {/* AppBar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4">Pokedex</Typography>
        </Toolbar>
      </AppBar>
      {/* Fim AppBar */}
      <Container maxWidth="lg">
        <Box mt={2}>
          <Grid container spacing={2}>
            {pokemons.map((pokemon) => (
              <>
                <Grid item xs={6} lg={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {pokemon.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        onClick={() => setSelectedPokemon(pokemon)}
                        size="small"
                      >
                        Abrir
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </>
            ))}
          </Grid>
          Pokemons:
          <h2>
            Pokemon selecionado:{" "}
            {selectedPokemon?.name || "Nenhum Pokémon selecionado."}
          </h2>
          {JSON.stringify(selectedPokemonDetails, undefined, 2)}
        </Box>
      </Container>
    </div>
  );
};

export default Pokedex;

import React, { useEffect, useState } from 'react';
import { getPokemonDetails } from '../pokemon/services/getPokemonDetails';
import { PokemonDetail } from '../pokemon/interfaces/PokemonDetail';
import {
  listPokemon,
  PokemonListInterface,
} from '../pokemon/services/listPokemons';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';
import PokedexCard from './components/PokedexCard';

interface PokedexProps {}

export const Pokedex: React.FC<PokedexProps> = () => {
  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<
    PokemonListInterface | undefined
  >(undefined);

  useEffect(() => {
    listPokemon().then((response) => setPokemons(response.results));
  }, []);

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6'>Pokedex</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth='lg'>
        <Box mt={2}>
          <Grid container spacing={2}>
            {pokemons.map((pokemon) => (
              <>
                <Grid item xs={6} lg={3}>
                  <PokedexCard pokemon={pokemon} />
                </Grid>
              </>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Pokedex;

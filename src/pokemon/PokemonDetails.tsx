import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Container,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PokemonDetail } from './interfaces/PokemonDetail';
import { getPokemonDetails } from './services/getPokemonDetails';

interface PokemonDetailsProps {}

interface PokemonQueryParams {
  name: string;
}

export const PokemonDetails: React.FC<PokemonDetailsProps> = () => {
  const { name } = useParams<PokemonQueryParams>();
  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState<
    PokemonDetail | undefined
  >(undefined);

  useEffect(() => {
    if (!name) return;

    getPokemonDetails(name).then((response) =>
      setSelectedPokemonDetails(response)
    );
  }, [name]);

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6'>{name}</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth='lg'>
        <Box mt={2}>
          <img src={selectedPokemonDetails?.sprites.front_default} alt={name} />
          {/* <h2>
        Pokemon selecionado:{' '}
        {selectedPokemon?.name || 'Nenhum Pokémon selecionado.'}
      </h2> */}
          {JSON.stringify(
            selectedPokemonDetails?.sprites.front_default,
            undefined,
            2
          )}
        </Box>
      </Container>
    </div>
  );
};

export default PokemonDetails;

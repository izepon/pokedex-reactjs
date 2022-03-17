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
          <Typography variant='h5'>{name}</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth='lg'>
        <Box mt={2}>
          <img
            width='100%'
            height='auto'
            src={selectedPokemonDetails?.sprites.front_default}
            alt={name}
          />
        </Box>
        <Typography variant='h4'>{selectedPokemonDetails?.name}</Typography>

        {selectedPokemonDetails?.types.map((type) => (
          <Typography> {type.type.name}</Typography>
        ))}

        <Box display='flex' flexDirection='row'>
          <Typography>Espécie: </Typography>
          <Typography>{selectedPokemonDetails?.species.name}</Typography>
        </Box>
        <Box display='flex' flexDirection='row'>
          <Typography>Altura: </Typography>
          <Typography>{selectedPokemonDetails?.height}</Typography>
        </Box>
        <Box display='flex' flexDirection='row'>
          <Typography>Peso: </Typography>
          <Typography>{selectedPokemonDetails?.weight}</Typography>
        </Box>
        <Box display='flex' flexDirection='row'>
          <Typography>Habilidade: </Typography>
          <Typography>
            {selectedPokemonDetails?.abilities.map((ability) => (
              <Typography> {ability.ability.name}</Typography>
            ))}
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default PokemonDetails;

import React from 'react';
// import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { Chip } from '@material-ui/core';
import { PokemonDetail } from '../../pokemon/interfaces/PokemonDetail';

interface PokedexCardProps {
  pokemon: PokemonDetail;
}

// const Card = styled.section`
//   padding: 4em;
//   border-radius: 1.5em;
//   background: papayawhip;
// `;

export const PokedexCard: React.FC<PokedexCardProps> = ({ pokemon }) => {
  const history = useHistory();
  function handleClick() {
    history.push(`/pokemon/${pokemon.name}`);
  }

  return (
    <Card onClick={handleClick}>
      <CardMedia
        style={{ width: '100%', height: 0, paddingTop: '80%' }}
        image={pokemon.sprites.front_default}
        title='Paella dish'
      />
      <CardHeader
        title={pokemon.name}
        subheader={pokemon.types.map((type) => (
          <Chip label={type.type.name} variant='outlined' />
        ))}
      />
    </Card>
  );
};

export default PokedexCard;

import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Card from './Card';

const CardListContainer = styled.section`
display: flex;
justify-content: center;
align-items: center;
flex-wrap: wrap;
`;

function CardList() {
  const userChosenCities = useSelector((state) => state.pickedCities);


  return (
    <CardListContainer>
      {
        userChosenCities.map((city) => <Card city={city} />)
      }
    </CardListContainer>
  );
}

export default CardList;

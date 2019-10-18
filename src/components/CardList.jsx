import React from 'react';
import styled from 'styled-components';

const CardListContainer = styled.section`
display: flex;
justify-content: center;
align-items: center;
flex-wrap: wrap;
`;

function CardList() {


  return (
    <CardListContainer>
      <h1> Location of cards </h1>
    </CardListContainer>
  );
}

export default CardList;

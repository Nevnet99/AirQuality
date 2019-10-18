import React from 'react';
import styled from 'styled-components';


function CardList() {
  const CardListContainer = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  `;

  return (
    <CardListContainer>
      <h1> Location of cards </h1>
    </CardListContainer>
  );
}

export default CardList;

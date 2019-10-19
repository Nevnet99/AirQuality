import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const CardContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  background: white;
  border-radius: 10px;
  margin: 1em;
  color: black;
  padding: 1.5em;
`;

const LastUpdated = styled.p`
font-size: 0.8em;
margin: 0;
margin-bottom: 0.5em;

`;

const CardTitle = styled.h2`
  font-size: 1.2em;
  color: purple;
  font-weight: 800;
  margin: 0;
  margin-bottom: 0.3em;

`;

const Location = styled.p`
margin: 0;
margin-bottom: 0.5em;
`;

const Values = styled.p`
  font-weight: 600;
  margin: 0;
`

function Card({ city }) {
  
  return (
    <CardContainer>
      <LastUpdated>UPDATED {moment(city.lastUpdated, "YYYYMMDD").fromNow().toUpperCase()}</LastUpdated>
      <CardTitle>{city.location}</CardTitle>
      <Location>in {city.city}, United Kingdom</Location>
      <Values>Values: </Values>
    </CardContainer>
  );
}

export default Card;

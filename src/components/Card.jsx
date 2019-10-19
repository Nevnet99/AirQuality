import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Close } from 'styled-icons/evil/Close';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getLocationData, removeCard } from '../redux/actions/index';

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
  padding-top: 1em;
  min-width: 25%;
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
`;

const FaIcon = styled(Close)`
  width: 25px;
  height: 25px;
  align-self: flex-end;
  cursor: pointer;
`;

function Card({ city }) {
  const locationData = useSelector((state) => state.locationData
    .filter((location) => location.location === city.location));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocationData(city.location, city.lastUpdated));
  }, []);

  return (
    <CardContainer>
      <FaIcon
        onClick={() => dispatch(removeCard({ id: city.id, location: city.location }))}
        icon={Close}
      />
      <LastUpdated>
        UPDATED
        {' '}
        {moment(city.lastUpdated, 'YYYYMMDD').fromNow().toUpperCase()}
      </LastUpdated>
      <CardTitle>{city.location}</CardTitle>
      <Location>
        in
        {' '}
        {city.city}
        , United Kingdom
      </Location>
      <Values>
Values:
        {locationData.length ? locationData.map((value, index) => {
          if (index === locationData.length - 1) {
            return ` ${value.parameter.toUpperCase()}: ${value.value}`;
          }
          return ` ${value.parameter.toUpperCase()}: ${value.value},`;
        }) : ' Sorry no values available.'}
      </Values>
    </CardContainer>
  );
}

Card.propTypes = {
  city: PropTypes.shape({
    id: PropTypes.number,
    location: PropTypes.string,
    city: PropTypes.string,
    lastUpdated: PropTypes.string,
  }).isRequired,
};

export default Card;

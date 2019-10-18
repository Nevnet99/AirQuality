import axios from 'axios';
import { ADD_CITY, ADD_USERCITY } from '../constants/index';


export function addCity(payload) {
  return { type: ADD_CITY, payload };
}

export function addUserCity(payload) {
  return { type: ADD_USERCITY, payload };
}

export function getAutoCompleteData(city) {
  return function (dispatch) {
    return axios.get(`https://api.openaq.org/v1/locations?city=${city}`)
      .then((response) => {
        dispatch({ type: 'DATA_LOADED', payload: response });
      });
  };
}
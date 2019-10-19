import axios from 'axios';
import { GET_AUTOCOMPLETEDATA, ADD_USERCITY, CHOSEN_CITY } from '../constants/index';

export function addUserCity(payload) {
  return { type: ADD_USERCITY, payload };
}

export function getAutoCompleteData(city) {
  return function (dispatch) {
    return axios.get(`https://api.openaq.org/v1/locations?city=${city}&country=GB`)
      .then((response) => {
        dispatch({ type: GET_AUTOCOMPLETEDATA, payload: response.data.results });
      });
  };
}

export function selectedCity(payload) {
  return { type: CHOSEN_CITY, payload };
}

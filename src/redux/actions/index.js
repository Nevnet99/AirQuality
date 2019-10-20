import axios from 'axios';
import { GET_AUTOCOMPLETEDATA, ADD_USERCITY, CHOSEN_CITY, GET_LOCATIONDATA, REMOVE_CARD, CLEAR_ERRORS, CLEAR_AUTOCOMPLETEDATA } from '../constants/index';

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

export function removeCard(payload) {
  return { type: REMOVE_CARD, payload };
}

export function removeAutoCompleteData(payload) {
  return { type: CLEAR_AUTOCOMPLETEDATA, payload };
}

export function getLocationData(location, lastUpdated) {
  return function (dispatch) {
    return axios.get(`https://api.openaq.org/v1/measurements?location=${location}&country=GB&parameter[]=pm25&parameter[]=so2&parameter[]=o3&parameter[]=no2&date_from=${lastUpdated}&limit=4`)
      .then((response) => {
        dispatch({ type: GET_LOCATIONDATA, payload: response.data.results });
      });
  };
}

export function clearErrors() {
  return { type: CLEAR_ERRORS };
}

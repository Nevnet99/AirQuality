import { ADD_USERCITY, GET_AUTOCOMPLETEDATA, CHOSEN_CITY } from '../constants/index';
import { stat } from 'fs';

const initialState = {
  autoCompleteCities: [],
  userCity: '',
  pickedCities: [],
};
function rootReducer(state = initialState, action) {
  if (action.type === GET_AUTOCOMPLETEDATA) {
    return { ...state, autoCompleteCities: action.payload };
  }

  if (action.type === ADD_USERCITY) {
    return { ...state, userCity: action.payload };
  }

  if (action.type === CHOSEN_CITY) {
    const userChosenCity = state.autoCompleteCities.filter((city) => {
      if (city.id === action.payload) {
        return city;
      }
    });

    return { ...state, pickedCities: state.pickedCities.concat(userChosenCity) };
  }

  return state;
}


export default rootReducer;

import { ADD_USERCITY, GET_AUTOCOMPLETEDATA, CHOSEN_CITY, GET_LOCATIONDATA, REMOVE_CARD, CLEAR_ERRORS } from '../constants/index';

const initialState = {
  autoCompleteCities: [],
  autoCompleteData: [],
  locationData: [],
  userCity: '',
  pickedCities: [],
  error: [],
};
function rootReducer(state = initialState, action) {
  if (action.type === GET_AUTOCOMPLETEDATA) {
    const getDistinctCities = action.payload.map((item) => item.city)
      .filter((value, index, self) => self.indexOf(value) === index);

    return { ...state, autoCompleteCities: getDistinctCities, autoCompleteData: action.payload };
  }

  if (action.type === ADD_USERCITY) {
    return { ...state, userCity: action.payload };
  }

  if (action.type === CHOSEN_CITY) {
    const userChosenCity = state.autoCompleteData.filter((city) => city.city === action.payload);

    const checkForDupes = state.pickedCities.filter((city) => city.city === action.payload);
    if (checkForDupes.length) {
      return { ...state, error: state.error.concat(`Cannot add ${action.payload} twice.`) };
    }

    return { ...state, pickedCities: state.pickedCities.concat(userChosenCity) };
  }

  if (action.type === GET_LOCATIONDATA) {
    return { ...state, locationData: state.locationData.concat(action.payload) };
  }

  if (action.type === REMOVE_CARD) {
    return {
      ...state,
      pickedCities: state.pickedCities.filter((city) => city.id !== action.payload.id),
      locationData: state.locationData.filter((locationData) => action.payload.location !== locationData.location),
    };
  }

  if (action.type === CLEAR_ERRORS) {
    return { ...state, error: [] };
  }
  return state;
}


export default rootReducer;

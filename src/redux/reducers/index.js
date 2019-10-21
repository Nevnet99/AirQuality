import {
  ADD_USERCITY, GET_AUTOCOMPLETEDATA, CHOSEN_CITY, GET_LOCATIONDATA, REMOVE_CARD, CLEAR_ERRORS, CLEAR_AUTOCOMPLETEDATA,
} from '../constants/index';


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

  if (action.type === CLEAR_AUTOCOMPLETEDATA) {
    return { ...state, autoCompleteCities: [] };
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
    const orderedValues = action.payload.reduce((acc, cur) => {
      if (acc[cur.parameter]) {
        acc[cur.parameter].push(cur);
      } else {
        acc[cur.parameter] = [];
        acc[cur.parameter].push(cur);
      }
      return acc;
    }, {});

    const mostRecentValues = [];

    Object.keys(orderedValues).forEach((key) => {
      if (orderedValues[key].length > 1) {
        const mostRecent = orderedValues[key].reduce((acc, currentValue) => (acc.date.utc > currentValue.date.utc ? currentValue : acc));
        mostRecentValues.push(mostRecent);
      } else {
        mostRecentValues.push(orderedValues[key][0]);
      }
    });
    

    return { ...state, locationData: state.locationData.concat(mostRecentValues) };
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

import { ADD_USERCITY, GET_AUTOCOMPLETEDATA, CHOSEN_CITY, GET_LOCATIONDATA } from '../constants/index';

const initialState = {
  autoCompleteCities: [],
  autoCompleteData: [],
  locationData: [],
  userCity: '',
  pickedCities: [],
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
    const userChosenCity = state.autoCompleteData.filter((city) => {
      if (city.city === action.payload) {
        return city;
      }
    });
    return { ...state, pickedCities: state.pickedCities.concat(userChosenCity) };
  }

  if (action.type === GET_LOCATIONDATA) {
    return { ...state, locationData: state.locationData.concat(action.payload) };
  }

  return state;
}


export default rootReducer;

import { ADD_USERCITY, GET_AUTOCOMPLETEDATA, CHOSEN_CITY } from '../constants/index';

const initialState = {
  autoCompleteCities: [],
  autoCompleteData: [],
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

  return state;
}


export default rootReducer;

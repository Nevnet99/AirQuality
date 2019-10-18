import { ADD_USERCITY, GET_AUTOCOMPLETEDATA } from '../constants/index';

const initialState = {
  autoCompleteCities: [],
  userCity: '',
};
function rootReducer(state = initialState, action) {
  if (action.type === GET_AUTOCOMPLETEDATA) {
    return { ...state, autoCompleteCities: action.payload };
  }

  if (action.type === ADD_USERCITY) {
    return { ...state, userCity: action.payload };
  }

  return state;
}


export default rootReducer;

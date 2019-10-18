import { ADD_CITY, ADD_USERCITY } from '../constants/index';  

const initialState = {
  autoCompleteCities: [],
  userCity: "",
};
function rootReducer(state = initialState, action) {
  if (action.type === ADD_CITY) {
    return Object.assign({}, state, {
      autoCompleteCities: state.autoCompleteCities.concat(action.payload)
    });
  }

  if (action.type === ADD_USERCITY) {
    return Object.assign({}, state, {
      userCity: action.payload
    })
  }  

  return state;
}

export default rootReducer;

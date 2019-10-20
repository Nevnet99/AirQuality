/* eslint-disable no-undef */
import rootReducer from '../../../redux/reducers';
import {
  ADD_USERCITY, GET_AUTOCOMPLETEDATA, CHOSEN_CITY, GET_LOCATIONDATA, REMOVE_CARD, CLEAR_ERRORS, CLEAR_AUTOCOMPLETEDATA,
} from '../../../redux/constants/index';

describe('Test Redux Reducers', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      autoCompleteCities: [],
      autoCompleteData: [],
      locationData: [],
      userCity: '',
      pickedCities: [],
      error: [],
    };
  });


  describe('GET_AUTOCOMPLETEDATA', () => {
    it('should return distinct cities into state', () => {
      const payload = { type: GET_AUTOCOMPLETEDATA, payload: [{ city: 'Manchester' }, { city: 'Manchester' }, { city: 'Leeds' }] };
      const updatedState = rootReducer(initialState, payload);
      expect(updatedState.autoCompleteCities).toHaveLength(2);
    });
  });

  describe('CLEAR_AUTOCOMPLETEDATA', () => {
    it('should delete all data for the autocomplete', () => {
      const payload = { type: CLEAR_AUTOCOMPLETEDATA, payload: '' };
      const deletedState = rootReducer(initialState, payload);
      initialState.autoCompleteCities = ['Manchester', 'New York', 'Test Place'];
      expect(deletedState.autoCompleteCities).toEqual([]);
    });
  });

  describe('ADD_USERCITY', () => {
    it('should update the state of userCity', () => {
      const payload = { type: ADD_USERCITY, payload: 'Manchester' };
      const updatedUserCity = rootReducer(initialState, payload);
      expect(updatedUserCity.userCity).toEqual('Manchester');
    });
  });

  describe('CHOSEN_CITY', () => {
    const payload = { type: CHOSEN_CITY, payload: 'Manchester' };
    const payload2 = { type: CHOSEN_CITY, payload: 'Leeds' };

    it('should append to the pickedCities state.', () => {
      initialState.autoCompleteData = [{ city: 'Manchester' }, { city: 'Leeds' }];
      const updatedChosenCity = rootReducer(initialState, payload);
      expect(updatedChosenCity.pickedCities).toContainEqual({ city: 'Manchester' });
    });

    it('should be able to handle multiple requests.', () => {
      initialState.autoCompleteData = [{ city: 'Manchester' }, { city: 'Leeds' }];
      const firstState = rootReducer(initialState, payload);
      const updatedChosenCity = rootReducer(firstState, payload2);
      expect(updatedChosenCity.pickedCities).toHaveLength(2);
    });

    it('should not let you choose a city twice.', () => {
      initialState.autoCompleteData = [{ city: 'Manchester' }, { city: 'Leeds' }];
      const state = rootReducer(initialState, payload);
      const updatedUserCity = rootReducer(state, payload);
      expect(updatedUserCity.pickedCities).toHaveLength(1);
      expect(updatedUserCity.error).toHaveLength(1);
    });
  });

  describe('GET_LOCATIONDATA', () => {
    it('should return a result with no duplicates of values and choose the most recent.', () => {
      const payload = {
        type: GET_LOCATIONDATA,
        payload:
          [
            { parameter: 'o2', date: [{ utc: '2016-02-27T21:00:00.000Z' }] },
            { parameter: 'o2', date: [{ utc: '2017-02-27T21:00:00.000Z' }] },
            { parameter: 'pm25', date: [{ utc: '2016-02-27T21:00:00.000Z' }] },
          ],
      };
      const state = rootReducer(initialState, payload);
      expect(state.locationData).toHaveLength(2);
    });

    it('should check and choose the most recent.', () => {
      const payload = {
        type: GET_LOCATIONDATA,
        payload:
          [
            { parameter: 'o2', date: [{ utc: '2017-02-27T21:00:00.000Z' }] },
            { parameter: 'o2', date: [{ utc: '2016-02-27T21:00:00.000Z' }] },
          ],
      };
      const state = rootReducer(initialState, payload);
      expect(state.locationData).toEqual([{ parameter: 'o2', date: [{ utc: '2017-02-27T21:00:00.000Z' }] }]);
    });
  });


  describe('REMOVE_CARD', () => {
    it('should remove a card.', () => {
      initialState.locationData = [{ id: 'A1', location: 'Manchester' }];
      initialState.pickedCities = [{ id: 'A1', location: 'Manchester' }];
      const payload = {
        type: REMOVE_CARD,
        payload: { id: 'A1', location: 'Manchester' },
      };
      const state = rootReducer(initialState, payload);
      expect(state.locationData).toEqual([]);
      expect(state.pickedCities).toEqual([]);
    });
  });

  describe('CLEAR_ERRORS', () => {
    it('should remove a error.', () => {
      initialState.error = ['this is a test error'];
      const payload = {
        type: CLEAR_ERRORS,
        payload: '',
      };
      const state = rootReducer(initialState, payload);
      expect(state.error).toHaveLength(0);
    });
  });
});

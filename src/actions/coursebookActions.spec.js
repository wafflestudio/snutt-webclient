import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { initialize } from './courseBookActions';
import * as types from './actionTypes';

const store = configureMockStore([thunk])();

describe('coursebook actions', () => {
  afterEach(() => {
    store.clearActions();
  });

  describe('initialize', () => {
    it('dispatches proper actions', async () => {
      await store.dispatch(initialize());
      expect(store.getActions()[0]).toHaveProperty('type', types.GET_COLOR_OK);
      expect(store.getActions()[1]).toHaveProperty(
        'type',
        types.CHANGE_COURSEBOOK,
      );
    });
  });
});

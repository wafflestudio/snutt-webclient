import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getTemporaryToken } from '../api';

import { initialize, fetchUserInfo } from './loadingActions';
import * as types from './actionTypes';

const store = configureMockStore([thunk])();

describe('loading actions', () => {
  afterEach(() => {
    store.clearActions();
  });

  describe('initialize', () => {
    it('dispatches proper actions', async () => {
      await store.dispatch(initialize());
      expect(store.getActions()[0]).toHaveProperty('type', types.LOAD_OK);
    });
  });

  describe('fetchUserInfo', () => {
    it('dispatches proper actions', async () => {
      const token = await getTemporaryToken();
      await store.dispatch(fetchUserInfo(token));
      expect(store.getActions()[0]).toHaveProperty('type', types.LOGIN_OK);
      expect(store.getActions()[1]).toHaveProperty('type', types.GET_TABLELIST);
      expect(store.getActions()[2]).toHaveProperty(
        'type',
        types.UPDATE_NEW_MESSAGE_COUNT,
      );
    });
  });
});

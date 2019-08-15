import client from 'api/client';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import {
  openMessageBox,
  closeMessageBox,
  getMessages,
  checkNewMessages,
  getMessagesThunk,
  checkNewMessagesThunk,
} from './actions';
import { notificationReducer } from './reducers';
import MockNotificationResponse from './data/mockNotificationMessages';
import MockNewMessageCounts from './data/mockNewMessageCounts';
import { ok } from 'assert';

describe('notification ducks', () => {
  it('openMessageBox action opens message box', () => {
    expect(notificationReducer(undefined, openMessageBox()).opened).toEqual(
      true,
    );
  });

  it('closeMessageBox action closes message box', () => {
    expect(notificationReducer(undefined, closeMessageBox()).opened).toEqual(
      false,
    );
  });

  describe('thunk actions', () => {
    let store: MockStoreEnhanced<unknown, {}>;
    beforeEach(() => {
      store = mockStore({});
    });

    it('getMessages thunk action should fetch messages from API', () => {
      const mock = new MockAdapter(client);
      mock
        .onGet('/notification?limit=10&offset=0&explicit=1')
        .reply(200, MockNotificationResponse);

      //@ts-ignore
      return store.dispatch(getMessagesThunk()).then(() => {
        expect(mock.history.get.length).toBe(1);
        expect(store.getActions()[0].type).toBe('GET_MESSAGE_OK');
        expect(store.getActions()[0].messages.length).toBe(3);
      });
    });

    it('checkNewMessage thunk action should fetch count from API and update store', () => {
      const mock = new MockAdapter(client);
      mock.onGet('/notification/count').reply(200, MockNewMessageCounts);

      //@ts-ignore
      return store.dispatch(checkNewMessagesThunk()).then(() => {
        expect(mock.history.get.length).toBe(1);
        expect(store.getActions()[0].type).toBe('CHECK_NEW_MESSAGE_OK');
        expect(store.getActions()[0].count).toBe(0);
      });
    });
  });
});

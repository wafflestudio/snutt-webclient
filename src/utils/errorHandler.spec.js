import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import errorHandler from '../utils/errorHandler';

describe('Error handler util', () => {
  it('returns resolved value of input promise', async () => {
    const value = 'hi';
    const inputPromise = new Promise(resolve => resolve(value));
    const wrappedOutput = await errorHandler(inputPromise);

    expect(wrappedOutput).toEqual(value);
  });

  it('returns object with "error" property when input promise failed', async () => {
    const inputPromise = new Promise((resolve, reject) => reject('hi'));
    const wrappedOutput = await errorHandler(inputPromise, false);

    expect(wrappedOutput.error).toBeDefined();
  });

  describe('should handle API error', () => {
    const ERROR_CODE = 8196;
    const ERROR_MESSAGE_KR = '찾을 수 없는 ID입니다.';

    beforeAll(() => {
      var mock = new MockAdapter(axios);
      mock
        .onGet('/login_local')
        .reply(403, { errcode: ERROR_CODE, message: 'wrong id' });
    });

    it('with alert', async () => {
      window.alert = jest.fn();
      await errorHandler(axios.get('/login_local'));

      expect(window.alert).toBeCalled();
      expect(window.alert.mock.calls[0][0]).toBe(ERROR_MESSAGE_KR);
    });

    it('with no alert if option is passed', async () => {
      window.alert = jest.fn();
      await errorHandler(axios.get('/login_local'), false);

      expect(window.alert).not.toBeCalled();
    });

    it('by resolving promise with errorCode and errorMessage', async () => {
      const wrappedOutput = await errorHandler(axios.get('/login_local'));

      const { errorCode, errorMessage } = wrappedOutput.error;
      expect(errorCode).toBe(ERROR_CODE);
      expect(errorMessage).toBe(ERROR_MESSAGE_KR);
    });
  });
});

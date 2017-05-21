import { CALL_API } from '../middleware/api';

export const GET_MESSAGE_START = 'GET_MESSAGE_START';
export const GET_MESSAGE_OK = 'GET_MESSAGE_OK';
export const OPEN_MESSAGE_BOX = 'OPEN_MESSAGE_BOX';
export const CLOSE_MESSAGE_BOX = 'CLOSE_MESSAGE_BOX';
export const CHECK_NEW_MESSAGE_START = 'CHECK_NEW_MESSAGE_START';
export const CHECK_NEW_MESSAGE_OK = 'CHECK_NEW_MESSAGE_OK';
// to be replaced soon with other error handelrs
export const NOTIFICATION_FAIL = 'NOTIFICATION_FAIL';

export const openMessageBox = () => ({ type: OPEN_MESSAGE_BOX });
export const closeMessageBox = () => ({ type: CLOSE_MESSAGE_BOX });

export function fetchMessages(limit = 10, offset) {
  return {
    [CALL_API]: {
      endpoint: `notification?limit=${Number(limit)}&${Number(offset)}&explicit=1`,
      config: { method: 'get' },
      authenticated: true,
      types: [GET_MESSAGE_START, GET_MESSAGE_OK, NOTIFICATION_FAIL],
    },
  };
}

export function checkNewMessage() {
  return {
    [CALL_API]: {
      endpoint: 'notification/count',
      config: { method: 'get' },
      authenticated: true,
      types: [CHECK_NEW_MESSAGE_START, CHECK_NEW_MESSAGE_OK, NOTIFICATION_FAIL],
    },
  };
}

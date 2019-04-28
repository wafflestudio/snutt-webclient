import * as api from 'api';
import err from 'utils/errorHandler';

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

export const fetchMessages = (limit = 10, offset) => async dispatch => {
  const response = await err(api.getMessages(limit, offset));

  !response.error && dispatch({ type: GET_MESSAGE_OK, response });
};

export const checkNewMessages = () => async dispatch => {
  const response = await err(api.getNewMessageCount());

  !response.error && dispatch({ type: CHECK_NEW_MESSAGE_OK, response });
};

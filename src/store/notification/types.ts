import { Notification } from 'types';

export const GET_MESSAGE_OK = 'GET_MESSAGE_OK';
export const OPEN_MESSAGE_BOX = 'OPEN_MESSAGE_BOX';
export const CLOSE_MESSAGE_BOX = 'CLOSE_MESSAGE_BOX';
export const CHECK_NEW_MESSAGE_OK = 'CHECK_NEW_MESSAGE_OK';

interface OpenMessageBoxAction {
  type: typeof OPEN_MESSAGE_BOX;
}

interface CloseMessageBoxAction {
  type: typeof CLOSE_MESSAGE_BOX;
}

interface GetMessageAction {
  type: typeof GET_MESSAGE_OK;
  messages: Notification[];
}

interface CheckNewMessageAction {
  type: typeof CHECK_NEW_MESSAGE_OK;
  count: number;
}

export type NotficationActionTypes =
  | OpenMessageBoxAction
  | CloseMessageBoxAction
  | GetMessageAction
  | CheckNewMessageAction;

export interface NotificationState {
  fetching: boolean;
  offset: number;
  messages: [];
  opened: boolean;
  hasNew: boolean;
}

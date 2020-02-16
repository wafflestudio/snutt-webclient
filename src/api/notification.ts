import { Notification, NotificationCountResponse } from 'types';

import client from './client';

export const getMessages = async (limit?: number, offset?: number): Promise<Notification[]> =>
  (await client.get(`notification?limit=${limit}&offset=${offset}&explicit=1`))
    .data;

export const getNewMessageCount = async (): Promise<NotificationCountResponse>  =>
  (await client.get(`notification/count`)).data;

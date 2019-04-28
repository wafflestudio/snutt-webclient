import client from './client';

export const getMessages = async (limit, offset) =>
  (await client.get(`notification?limit=${limit}&offset=${offset}&explicit=1`))
    .data;

export const getNewMessageCount = async () =>
  (await client.get(`notification/count`)).data;

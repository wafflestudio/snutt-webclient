import client from './client';

export const getRecentTable = async () =>
  (await client.get('tables/recent')).data;

export const getTableList = async () => (await client.get('tables/')).data;

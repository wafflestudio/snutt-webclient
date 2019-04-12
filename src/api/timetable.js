import client, { encodeParams } from './client';

export const getRecentTable = async () =>
  (await client.get('tables/recent')).data;

export const getTableList = async () => (await client.get('tables/')).data;

export const postNewTable = async (year, semester, title) =>
  (await client.post('tables/', encodeParams({ title, year, semester }))).data;

export const deleteTableById = async _id =>
  (await client.delete(`tables/${_id}`)).data;

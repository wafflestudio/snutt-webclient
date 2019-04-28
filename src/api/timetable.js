import client, { encodeParams } from './client';

/**
 * Table
 */
export const getTableList = async () => (await client.get('tables/')).data;

export const getTable = async tableId =>
  (await client.get(`tables/${tableId}`)).data;

export const postNewTable = async (year, semester, title) =>
  (await client.post('tables/', encodeParams({ title, year, semester }))).data;

export const deleteTableById = async _id =>
  (await client.delete(`tables/${_id}`)).data;

export const getRecentTable = async () =>
  (await client.get('tables/recent')).data;

export const updateTableTitle = async (tableId, title) =>
  (await client.put(`tables/${tableId}/`, { title })).data;

/**
 * Lecture
 */
export const addLecture = async (tableId, lectureId) =>
  (await client.post(`tables/${tableId}/lecture/${lectureId}`)).data;

export const addCustomLecture = async (tableId, lecture) =>
  (await client.post(`tables/${tableId}/lecture`, lecture)).data;

export const deleteLecture = async (tableId, lectureId) =>
  (await client.delete(`tables/${tableId}/lecture/${lectureId}`)).data;

export const updateLecture = async (tableId, lectureId, updatedLecture) =>
  (await client.put(`tables/${tableId}/lecture/${lectureId}`, updatedLecture))
    .data;

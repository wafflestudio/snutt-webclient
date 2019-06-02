import client, { encodeParams } from './client';
import { AbstractTimetable, Timetable, Lecture } from 'types';

/**
 * Table
 */
export const getTableList = async (): Promise<AbstractTimetable[]> =>
  (await client.get('tables/')).data;

export const getTable = async (tableId: string): Promise<Timetable> =>
  (await client.get(`tables/${tableId}`)).data;

export const postNewTable = async (
  year: number,
  semester: number,
  title: string,
): Promise<AbstractTimetable[]> =>
  (await client.post('tables/', encodeParams({ title, year, semester }))).data;

export const deleteTableById = async (
  _id: string,
): Promise<AbstractTimetable[]> => (await client.delete(`tables/${_id}`)).data;

export const getRecentTable = async (): Promise<Timetable> =>
  (await client.get('tables/recent')).data;

export const updateTableTitle = async (
  tableId: string,
  title: string,
): Promise<AbstractTimetable[]> =>
  (await client.put(`tables/${tableId}/`, { title })).data;

/**
 * Lecture
 */
export const addLecture = async (
  tableId: string,
  lectureId: string,
): Promise<Timetable> =>
  (await client.post(`tables/${tableId}/lecture/${lectureId}`)).data;

export const addCustomLecture = async (
  tableId: string,
  lecture: Lecture,
): Promise<Timetable> =>
  (await client.post(`tables/${tableId}/lecture`, lecture)).data;

export const deleteLecture = async (
  tableId: string,
  lectureId: string,
): Promise<AbstractTimetable[]> =>
  (await client.delete(`tables/${tableId}/lecture/${lectureId}`)).data;

export const updateLecture = async (
  tableId: string,
  lectureId: string,
  updatedLecture: Partial<Lecture>,
): Promise<Timetable> =>
  (await client.put(`tables/${tableId}/lecture/${lectureId}`, updatedLecture))
    .data;

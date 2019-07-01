import client, { encodeParams, urlEncodedFormConfig } from './client';
export * from './user';
export * from './auth';
export * from './timetable';
export * from './notification';

export const getColorPalette = async () => {
  const resp = await client.get('colors/vivid_ios');
  return resp.data.colors;
};
export const getCoursebooks = async () => {
  const resp = await client.get('course_books');
  return resp.data;
};

export const getTags = async (year, semester) => {
  const resp = await client.get(`tags/${year}/${semester}`);
  return resp.data;
};

export const postFeedback = async (email, message) =>
  (await client.post(
    'feedback/',
    encodeParams({ email, message }),
    urlEncodedFormConfig,
  )).data;

export const getQueryResults = async query =>
  (await client.post('search_query', query)).data;

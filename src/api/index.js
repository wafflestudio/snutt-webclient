import client, { encodeParams, urlEncodedFormConfig } from './client';
export * from './user';
export * from './auth';
export * from './timetable';

export const getColorPalette = async () => {
  const resp = await client.get('colors/vivid_ios');
  return resp.data.colors;
};
export const getCoursebooks = async () => {
  const resp = await client.get('course_books');
  return resp.data;
};

// Notification
export const getNotiCount = async () =>
  (await client.get('notification/count')).data;

export const postFeedback = async (email, message) =>
  (await client.post(
    'feedback/',
    encodeParams({ email, message }),
    urlEncodedFormConfig,
  )).data;

import client from './client';

export const getColorPalette = async () => {
  const resp = await client.get('colors/vivid_ios');
  return resp.data.colors;
};
export const getCoursebooks = async () => {
  const resp = await client.get('course_books');
  return resp.data;
};

export const getTemporaryToken = async () => {
  const resp = await client.post('auth/request_temp');
  return resp.data.token;
};

export const getUserInfo = async () => (await client.get('user/info')).data;
export const getTableList = async () => (await client.get('tables/')).data;
export const getRecentTable = async () =>
  (await client.get('tables/recent')).data;

// Notification
export const getNotiCount = async () =>
  (await client.get('notification/count')).data;

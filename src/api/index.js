import client from './client';

export const getColorPalette = () => client.get('colors/vivid_ios');
export const getCoursebooks = () => client.get('course_books');

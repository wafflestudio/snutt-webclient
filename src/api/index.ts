import {
  Lecture,
  LectureColor,
  CourseBook,
  FeedbackResponse,
  LectureQuery,
  TagList,
} from 'types';

import client, { encodeParams, urlEncodedFormConfig } from './client';
export * from './user';
export * from './auth';
export * from './timetable';
export * from './notification';

export const getColorPalette = async (): Promise<LectureColor[]> => {
  const resp = await client.get('colors/vivid_ios');
  return resp.data.colors;
};
export const getCoursebooks = async (): Promise<CourseBook[]> => {
  const resp = await client.get('course_books');
  return resp.data;
};

export const getTags = async (year: number, semester: number): Promise<TagList> => {
  const resp = await client.get(`tags/${year}/${semester}`);
  return resp.data;
};

export const postFeedback = async (email:number, message: number): Promise<FeedbackResponse> =>
  (await client.post(
    'feedback/',
    encodeParams({ email, message }),
    urlEncodedFormConfig,
  )).data;

export const getQueryResults = async (query: LectureQuery) : Promise<Lecture[]> =>
  (await client.post('search_query', query)).data;

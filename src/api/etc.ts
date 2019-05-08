import {
  Lecture,
  LectureColor,
  CourseBook,
  FeedbackResp,
  LectureQuery,
} from 'types';
import client, { encodeParams, urlEncodedFormConfig } from './client';

export const getColorPalette = async (): Promise<LectureColor[]> => {
  const resp = await client.get('colors/vivid_ios');
  return resp.data.colors;
};
export const getCoursebooks = async (): Promise<CourseBook[]> => {
  const resp = await client.get('course_books');
  return resp.data;
};

export const postFeedback = async (
  email: string,
  message: string,
): Promise<FeedbackResp> =>
  (await client.post(
    'feedback/',
    encodeParams({ email, message }),
    urlEncodedFormConfig,
  )).data;

export const getQueryResults = async (
  query: LectureQuery,
): Promise<Lecture[]> => (await client.post('search_query', query)).data;

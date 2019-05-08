import { LectureColor, CourseBook } from '../index';

export interface PaletteResponse {
  message: string;
  colors: LectureColor[];
}

export type CourseBookResponse = Array<CourseBook>;

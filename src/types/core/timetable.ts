import { Lecture } from './lecture';

export interface Timetable {
  _id?: string;
  user_id: string;
  year: number;
  semester: number;
  title: string;
  lecture_list: UserLecture[];
  updated_at: number;
}

export interface AbstractTimetable {
  _id: string;
  year: number;
  semester: number;
  title: string;
  updated_at: Date;
}

export interface LectureColor {
  fg: string;
  bg: string;
}

export interface TimePlace {
  day: number;
  start: number;
  len: number;
  place: string;
}

export interface UserLecture extends Lecture {
  created_at: Date;
  updated_at: Date;
  color?: LectureColor;
  colorIndex: number;
  course_number?: string; // 교과목 번호
  lecture_number?: string; // 강좌 번호
}

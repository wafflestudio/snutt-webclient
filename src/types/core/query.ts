import { Semester } from './coursebook';
import { SubType } from 'utils/typeHelper';

// https://github.com/wafflestudio/snutt/wiki/API-Search-Query
export interface LectureQuery extends LectureQueryFilter {
  offset?: number;
  limit?: number;
}

export interface LectureQueryFilter {
  classification: string[]; // 교과 구분
  credit: number[];
  course_number: string[];
  academic_year: string[]; // 학년
  instructor: string[]; // 강사
  department: string[]; // 학부
  category: string[];
  etc: string[];
  time_mask: number[];
}

export interface LectureQueryFilterOption {
  name: string;
  value: string | number;
}

export interface TagList {
  classification: string[];
  department: string[];
  academic_year: string[];
  credit: string[];
  instructor: string[];
  category: string[];
  etc: string[];
  updated_at: number;
}

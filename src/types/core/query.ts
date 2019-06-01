import { Semester } from './coursebook';

// https://github.com/wafflestudio/snutt/wiki/API-Search-Query
export interface LectureQuery {
  year: Number;
  semester: Number;
  title: string;
  classification?: string[]; // 교과 구분
  credit?: number[];
  course_number?: string[];
  academic_year?: string[]; // 학년
  instructor?: string[]; // 강사
  department?: string[]; // 학부
  category?: string[];
  etc?: string[];
  class_time_mask?: number[];
  offset?: number;
  limit?: number;
}

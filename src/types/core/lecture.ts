export interface Lecture {
  _id?: string;
  classification: string; // 교과 구분
  department: string; // 학부
  academic_year: string; // 학년
  course_title: string; // 과목명
  credit: number; // 학점
  class_time: string;
  class_time_json: TimePlace[];
  class_time_mask: number[];
  instructor: string; // 강사
  quota: number; // 정원
  remark: string; // 비고
  category: string;
}

export interface RefLecture extends Lecture {
  year: number; // 연도
  semester: number; // 학기
  course_number: string; // 교과목 번호
  lecture_number: string; // 강좌 번호
}

export interface TimePlace {
  day: number;
  start: number;
  len: number;
  place: string;
}

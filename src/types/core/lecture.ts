export interface Lecture {
  _id?: string;
  classification: string; // 교과 구분
  department: string; // 학부
  academic_year: string; // 학년
  course_title: string; // 과목명
  credit: number; // 학점
  class_time: string;
  class_time_json: TimePlace[];
  time_mask: number[];
  instructor: string; // 강사
  quota: number; // 정원
  remark: string; // 비고
  category: string;
  course_number: string; // 교과목 번호
  lecture_number: string; // 강좌 번호
}

export interface RefLecture extends Lecture {
  year: number; // 연도
  semester: number; // 학기
}

export interface TimePlace {
  day: number;
  start: number;
  len: number;
  place: string;
}

export const SampleLecture: Lecture = {
  _id: '5d4fce123c46177d58a7e936',
  classification: '전선',
  department: '경제학부',
  academic_year: '1학년',
  course_title: '경제원론 1',
  credit: 3,
  class_time: '월(1.5-1.5)/수(1.5-1.5)',
  instructor: '안동현',
  quota: 120,
  remark: '경제학부 홈페이지 공지사항 수업 참고',
  category: '',
  course_number: '200.105',
  lecture_number: '001',
  class_time_json: [
    {
      day: 0,
      start: 1.5,
      len: 1.5,
      place: '083-404',
    },
    {
      day: 2,
      start: 1.5,
      len: 1.5,
      place: '083-404',
    },
  ],
  time_mask: [117440512, 0, 117440512, 0, 0, 0, 0],
};

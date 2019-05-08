export enum Semester {
  Spring = 1,
  Summer,
  Fall,
  Winter,
}

export interface CourseBook {
  year: number;
  semester: Semester;
  updated_at: Date;
}

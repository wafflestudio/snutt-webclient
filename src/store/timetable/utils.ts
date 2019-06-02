import { AbstractTimetable } from 'types';
export const findViewTableIdForSemester = (
  year: number,
  semester: number,
  tableList: AbstractTimetable[],
): string | null => {
  const tablesForSemester = tableList.filter(
    t => t.year === year && t.semester === semester,
  );
  if (tablesForSemester.length > 0) {
    return tablesForSemester[0]._id;
  }
  return null;
};

import { loadCourseBook, changeCourseBook } from './actions';
import { courseBookReducer } from './reducers';

const courseBooks = [
  {
    year: 2019,
    semester: 2,
    updated_at: new Date('2019-05-11'),
  },
  {
    year: 2019,
    semester: 3,
    updated_at: new Date('2019-08-11'),
  },
];

describe('courseBook ducks', () => {
  it('loadCourseBook action loads list of coursebooks', () => {
    const newState = courseBookReducer(undefined, loadCourseBook(courseBooks));
    expect(newState.available.length).toEqual(2);
  });

  it('changeCourseBook action updates currentCoursebook', () => {
    const stateWithCoursebooks = courseBookReducer(
      undefined,
      loadCourseBook(courseBooks),
    );
    const stateAfterCoursebookSelected = courseBookReducer(
      stateWithCoursebooks,
      changeCourseBook(courseBooks[0]),
    );
    if (stateAfterCoursebookSelected.current) {
      expect(stateAfterCoursebookSelected.current.semester).toEqual(2);
    } else {
      fail();
    }
  });
});

import { createNewCourse, editCourse, closeCourse } from './actions';
import { courseEditorReducer } from './reducers';
import { SampleLecture } from '../../types/core/lecture';

describe('courseEditor ducks', () => {
  it('createNewCourse action opens the editor', () => {
    expect(courseEditorReducer(undefined, createNewCourse()).isOpen).toEqual(
      true,
    );
  });

  it('editCourse action should open the editor and load given course', () => {
    const stateAfterEditCourse = courseEditorReducer(
      undefined,
      editCourse(SampleLecture),
    );
    expect(stateAfterEditCourse.isOpen).toEqual(true);
    expect(stateAfterEditCourse.course).toEqual(SampleLecture);
  });

  it('closeCourse should close the editor and clear current editing course', () => {
    const stateAfterEditCourse = courseEditorReducer(
      undefined,
      editCourse(SampleLecture),
    );
    const stateAfterCloseCourse = courseEditorReducer(
      stateAfterEditCourse,
      closeCourse(),
    );
    expect(stateAfterCloseCourse.isOpen).toEqual(false);
    expect(stateAfterCloseCourse.course).toEqual({});
  });
});

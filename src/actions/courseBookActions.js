import { getColorPalette, getCoursebooks } from '../api';
import * as types from './actionTypes';

/**
 * Load list of coursebook, tags, and color palettes.
 * Then invoke loading timetables of user
 */
export const initialize = () => async dispatch => {
  const [colorPaletteResp, courseBooksResp] = await Promise.all([
    getColorPalette(),
    getCoursebooks(),
  ]);
  const currentCoursebook = courseBooksResp.data[0];
  dispatch({
    type: types.GET_COLOR_OK,
    response: { colors: colorPaletteResp.data.colors },
  });
  dispatch({
    type: types.CHANGE_COURSEBOOK,
    newCourseBook: currentCoursebook,
  });
};

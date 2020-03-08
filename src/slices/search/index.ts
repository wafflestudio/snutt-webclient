import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LectureQueryFilter, Lecture, TagList } from 'types';
import { runQuery } from './actions';

interface SearchState {
  query: LectureQueryFilter;
  result: Lecture[];
  tagList: TagList | null;
  useTime: boolean;
  searchEmptyTime: boolean;
  ui: {
    isFilterPanelOn: boolean;
    isTimeFilterPanelOn: boolean;
  };
}

type LectureQueryKey = keyof LectureQueryFilter;
interface MutateQueryActionPayload {
  key: LectureQueryKey;
  value: string | number; // TODO: typing 정확하게 하는 법 알아보기..(key에 맞게 set의 멤버 타입을 꺼내오기)
}

interface SetQueryActionPayload {
  key: LectureQueryKey;
  value: string[] | number[];
}

const initialState: SearchState = {
  query: {
    classification: [],
    credit: [],
    course_number: [],
    academic_year: [],
    instructor: [],
    department: [],
    category: [],
    etc: [],
    time_mask: [0, 0, 0, 0, 0, 0, 0],
  },
  result: [],
  tagList: null,
  useTime: false,
  searchEmptyTime: false,
  ui: {
    isFilterPanelOn: false,
    isTimeFilterPanelOn: false,
  },
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addQuery(state, action: PayloadAction<MutateQueryActionPayload>) {
      const { key, value } = action.payload;
      if (!state.query[key].includes(value as never)) {
        state.query[key].push(value as never);
      }
    },
    removeQuery(state, action: PayloadAction<MutateQueryActionPayload>) {
      const { key, value } = action.payload;
      const index = state.query[key].indexOf(value as never);
      if (index !== -1) {
        state.query[key].splice(index, 1);
      }
    },
    setQuery(state, action: PayloadAction<SetQueryActionPayload>) {
      const { key, value } = action.payload;
      // @ts-ignore
      state.query[key] = value;
    },
    resetQuery(state) {
      state.query = { ...initialState.query };
    },
    startSearch(state) {
      state.ui.isFilterPanelOn = false;
      state.ui.isTimeFilterPanelOn = false;

      state.result = [];
    },
    showSearchResult(state, action: PayloadAction<Lecture[]>) {
      state.result = action.payload;
    },
    setTagList(state, action: PayloadAction<TagList>) {
      state.tagList = action.payload;
    },
    toggleFilterPanel(state) {
      state.ui.isFilterPanelOn = !state.ui.isFilterPanelOn;
    },
    toggleTimeFilterPanel(state) {
      state.ui.isTimeFilterPanelOn = !state.ui.isTimeFilterPanelOn;
    },
    toggleUseTime(state) {
      state.useTime = !state.useTime;
    },
    setSearchEmptyTime(state, action: PayloadAction<boolean>) {
      state.searchEmptyTime = action.payload;
    },
  },
});

export const {
  addQuery,
  removeQuery,
  setQuery,
  resetQuery,
  startSearch,
  showSearchResult,
  setTagList,
  toggleFilterPanel,
  toggleTimeFilterPanel,
  toggleUseTime,
  setSearchEmptyTime,
} = searchSlice.actions;

export { runQuery };

export default searchSlice.reducer;

import React, { Component, FormEvent } from 'react';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';

import { AppState } from 'store';
import { CourseBook } from 'types';
import {
  runQuery,
  toggleSearchPanel,
  searchActionTypes,
} from 'store/search/actions';
import SearchFilter from 'components/MakeTimetable/Search/SearchFilter.jsx';
import IconWrapper from 'components/Common/IconWrapper.jsx';

import { ReactComponent as SearchIconNormal } from 'assets/ic-search-normal.svg';
import { ReactComponent as SearchIconHover } from 'assets/ic-search-over.svg';
import { ReactComponent as SearchIconFocus } from 'assets/ic-search-pressed.svg';
import { ReactComponent as FilterIconNormal } from 'assets/ic-condition-normal.svg';
import { ReactComponent as FilterIconNormalHovered } from 'assets/ic-condition-over.svg';
import { ReactComponent as FilterIconFocused } from 'assets/ic-condition-focused.svg';
import { ReactComponent as FilterIconFocusedHovered } from 'assets/ic-condition-focused-over.svg';

const formatLastUpdate = (currentBook: CourseBook | null) => {
  if (!currentBook) {
    return '';
  }
  const date = new Date(currentBook.updated_at);
  return `(수강편람 최근 업데이트: ${date.getFullYear()}. ${date.getMonth() +
    1}. ${date.getDate()})`;
};

interface OwnProps {}
interface OwnState {
  query: string;
  focused: boolean;
}
type StateProps = ReturnType<typeof mapStateToProps>;

type Props = OwnProps & StateProps & ReturnType<typeof mapDispatchToProps>;

class SearchBar extends Component<Props, OwnState> {
  state: OwnState = { query: '', focused: false };

  onTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ query: e.target.value });

  handleQuery = (e: FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    this.props.runQuery(this.state.query);
  };

  handleFocus = () => this.setState({ focused: true });
  handleBlur = () => this.setState({ focused: false });

  render() {
    const { isFilterOn, toggleSearchPanel, currentBook } = this.props;
    return (
      <div
        className={`searchbar-wrapper ${this.state.focused ? 'focused' : ''}`}
      >
        <form id="query" onSubmit={this.handleQuery}>
          <input
            value={this.state.query}
            placeholder={`원하는 강의를 검색하세요. ${formatLastUpdate(
              currentBook,
            )}`}
            onChange={this.onTextChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </form>
        <div id="tools">
          <IconWrapper
            id="search"
            onClick={this.handleQuery}
            normalIcon={<SearchIconNormal />}
            hoveredIcon={<SearchIconHover />}
            focusedIcon={<SearchIconFocus />}
          />
          <IconWrapper
            normalIcon={<FilterIconNormal />}
            hoveredIcon={<FilterIconNormalHovered />}
            focusedIcon={<FilterIconFocused />}
            focusedHoveredIcon={<FilterIconFocusedHovered />}
            focused={isFilterOn}
            onClick={toggleSearchPanel}
          />
        </div>
        {isFilterOn ? <SearchFilter /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  const {
    courseBook: { current: currentBook },
    search: {
      filter: { panel: isFilterOn },
      query,
    },
  } = state;
  return {
    currentBook,
    isFilterOn,
    query,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<searchActionTypes>) =>
  bindActionCreators({ runQuery, toggleSearchPanel }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBar);

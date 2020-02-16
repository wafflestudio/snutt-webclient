import React, { Component } from 'react';
import { connect } from 'react-redux';

import { runQuery, toggleSearchPanel } from '../../../actions/index.js';
import SearchFilter from '../../MakeTimetable/Search/SearchFilter.jsx';
import IconWrapper from '../../Common/IconWrapper.jsx';
import { ReactComponent as SearchIconNormal } from 'assets/ic-search-normal.svg';
import { ReactComponent as SearchIconHover } from 'assets/ic-search-over.svg';
import { ReactComponent as SearchIconFocus } from 'assets/ic-search-pressed.svg';
import { ReactComponent as FilterIconNormal } from 'assets/ic-condition-normal.svg';
import { ReactComponent as FilterIconNormalHovered } from 'assets/ic-condition-over.svg';
import { ReactComponent as FilterIconFocused } from 'assets/ic-condition-focused.svg';
import { ReactComponent as FilterIconFocusedHovered } from 'assets/ic-condition-focused-over.svg';

const mapStateToProps = ({
  courseBook,
  filter: { panel: filterOn },
  query,
}) => ({
  currentBook: courseBook.current,
  filterOn,
  queries: query.toJS(),
});

const mapDispatchToProps = dispatch => ({
  toggleFilter: () => dispatch(toggleSearchPanel()),
  runQuery: txt => dispatch(runQuery(txt)),
});

const formatLastUpdate = currentBook => {
  if (!currentBook) {
    return '';
  }
  const date = new Date(currentBook.updated_at);
  return `(수강편람 최근 업데이트: ${date.getFullYear()}. ${date.getMonth() +
    1}. ${date.getDate()})`;
};

class SearchBar extends Component {
  constructor() {
    super();
    this.state = { text: '', focused: false };
    this.onTextChange = e => this.setState({ text: e.target.value });
    this.handleQuery = this.handleQuery.bind(this);
  }

  handleQuery(e) {
    if (e) {
      e.preventDefault();
    }
    this.props.runQuery(this.state.text);
  }

  handleFocus = () => this.setState({ focused: true });
  handleBlur = () => this.setState({ focused: false });

  render() {
    const { filterOn, toggleFilter } = this.props;
    return (
      <div
        className={`searchbar-wrapper ${this.state.focused ? 'focused' : ''}`}
      >
        <form id="query" onSubmit={this.handleQuery}>
          <input
            value={this.state.text}
            placeholder={`원하는 강의를 검색하세요. ${formatLastUpdate(
              this.props.currentBook,
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
            focused={filterOn}
            onClick={toggleFilter}
          />
        </div>
        {filterOn ? <SearchFilter /> : null}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBar);

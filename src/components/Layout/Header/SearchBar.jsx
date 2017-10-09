import React, { Component } from 'react';
import { connect } from 'react-redux';

import { runQuery, toggleSearchPanel } from '../../../actions/index.js';
import SearchFilter from '../../MakeTimetable/Search/SearchFilter.jsx';
import IconWrapper from '../../Common/IconWrapper.jsx';
import SearchIconNormal from '../../../../assets/ic-search-normal.svg';
import SearchIconHover from '../../../../assets/ic-search-over.svg';
import SearchIconFocus from '../../../../assets/ic-search-pressed.svg';
import SearchConditionIcon from '../../../../assets/ic-condition-normal.svg';
import SearchConditionIconActivated from '../../../../assets/ic-condition-focused.svg';

const mapStateToProps = ({ courseBook, filter: { panel: filterOn }, query }) => ({
  currentBook: courseBook.get('current'),
  filterOn,
  queries: query.toJS(),
});

const mapDispatchToProps = dispatch => ({
  toggleFilter: () => dispatch(toggleSearchPanel()),
  runQuery: txt => dispatch(runQuery(txt)),
});

const formatLastUpdate = (currentBook) => {
  if (!currentBook) {
    return '';
  }
  const date = new Date(currentBook.updated_at);
  return `(수강편람 최근 업데이트: ${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()})`;
};


class SearchBar extends Component {
  constructor() {
    super();
    this.state = { text: '' };
    this.onTextChange = e => this.setState({ text: e.target.value });
    this.handleQuery = this.handleQuery.bind(this);
  }

  handleQuery(e) {
    if (e) {
      e.preventDefault();
    }
    this.props.runQuery(this.state.text);
  }

  render() {
    const { filterOn, toggleFilter } = this.props;
    return (
      <div id="searchbar-wrapper">
        <form id="query" onSubmit={this.handleQuery}>
          <input
            value={this.state.text}
            placeholder={`원하는 강의를 검색하세요. ${formatLastUpdate(this.props.currentBook)}`}
            onChange={this.onTextChange}
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
          {/* {true ? for dev*/}
          { filterOn ?
            <SearchConditionIconActivated
              className="svg-icon"
              onClick={toggleFilter}
            /> :
            <SearchConditionIcon
              className="svg-icon"
              onClick={toggleFilter}
            />
          }
        </div>
        { filterOn ? <SearchFilter /> : null }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

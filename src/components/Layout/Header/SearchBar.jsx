import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sendQuery, toggleSearchPanel } from '../../../actions/index.js';
import SearchFilter from '../../MakeTimetable/Search/SearchFilter.jsx';
import SearchIcon from '../../../../assets/ic-search.svg';
import SearchConditionIcon from '../../../../assets/ic-search-condition.svg';

const formatLastUpdate = (currentBook) => {
  if (!currentBook) {
    return '';
  }
  const date = new Date(currentBook.updated_at);
  return `(수강편람 최근 업데이트: ${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()})`;
};

const mapStateToProps = ({ courseBook, filter: { panel: filterOn } }) => ({
  currentBook: courseBook.get('current'),
  filterOn,
});

const mapDispatchToProps = dispatch => ({
  toggleFilter: () => dispatch(toggleSearchPanel()),
  sendQuery: query => dispatch(sendQuery(query)),
});

class SearchBar extends Component {
  constructor() {
    super();
    this.state = { text: '' };
    this.onTextChange = e => this.setState({ text: e.target.value });
  }

  render() {
    const { filterOn, toggleFilter } = this.props;
    return (
      <div id="searchbar-wrapper">
        <form id="query">
          <input
            value={this.state.text}
            placeholder={`원하는 강의를 검색하세요. ${formatLastUpdate(this.props.currentBook)}`}
            onChange={this.onTextChange}
          />
        </form>
        <div id="tools">
          <SearchIcon id="search" />
          <SearchConditionIcon onClick={toggleFilter} />
        </div>
        { true ? <SearchFilter /> : null }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

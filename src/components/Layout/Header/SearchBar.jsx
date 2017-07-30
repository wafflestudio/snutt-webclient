import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchIcon from '../../../../assets/ic-search.svg';
import SearchConditionIcon from '../../../../assets/ic-search-condition.svg';

const formatLastUpdate = (currentBook) => {
  if (!currentBook) {
    return '';
  }
  const date = new Date(currentBook.updated_at);
  return `(수강편람 최근 업데이트: ${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()})`;
};

const mapStateToProps = ({ courseBook }) => ({
  currentBook: courseBook.get('current'),
});

class SearchBar extends Component {
  constructor() {
    super();
    this.state = { text: '' };
    this.onTextChange = e => this.setState({ text: e.target.value });
  }

  render() {
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
          <SearchConditionIcon />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(SearchBar);

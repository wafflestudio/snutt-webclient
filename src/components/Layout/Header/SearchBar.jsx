import React, { Component } from 'react';

import SearchIcon from '../../../../assets/ic-search.svg';
import SearchConditionIcon from '../../../../assets/ic-search-condition.svg';

class SearchBar extends Component {
  render() {
    return (
      <div id="searchbar-wrapper">
        <input id="query" />
        <div id="tools">
          <SearchIcon id="search" />
          <SearchConditionIcon />
        </div>
      </div>
    );
  }
}

export default SearchBar;

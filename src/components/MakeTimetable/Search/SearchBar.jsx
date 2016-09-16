import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toggleSearchPanel } from '../../../actions'

class SearchBar extends Component {
  constructor() {
    super()
    this.state = { text: '' }
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
  }

  handleKeyDown(e) {
    if (this.state.text.length > 1 && e.keyCode == 13) {
      this.handleSearch()
    }
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value })
  }

  handleSearch(e) {
    this.props.handleSearch(this.state.text)
  }

  toggleFilter() {
    const { dispatch } = this.props
    dispatch(toggleSearchPanel())
  }

  render() {
    const { filterOn } = this.props
    return (
      <div className="row">
        <div id="searchbar-container" className="col-lg-8 col-lg-offset-2">
          <input
            type="text"
            id="search-form"
            className="form-control"
            placeholder="Course name"
            value={this.state.text}
            onChange={this.handleTextChange}
            onKeyDown={this.handleKeyDown}
          />
          <div id="search-button-container">
            <span
              className="glyphicon glyphicon-search"
              onClick={this.handleSearch}
            />
            <span
              className="glyphicon glyphicon-filter"
              id={ filterOn ? 'filter-open' : null }
              onClick={this.toggleFilter}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const filterOn = state.filter.panel
  return { filterOn }
}

export default connect(mapStateToProps)(SearchBar)

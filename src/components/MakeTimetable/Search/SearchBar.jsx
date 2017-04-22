import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toggleSearchPanel, resetQuery } from '../../../actions'
import { defaultQuery } from '../../../reducers'

class SearchBar extends Component {
  constructor() {
    super()
    this.state = { text: '' }
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value })
  }

  handleSearch(e) {
    e.preventDefault()
    this.props.handleSearch(this.state.text)
  }

  toggleFilter(e) {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(toggleSearchPanel())
  }

  resetFilter(e) {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(resetQuery())
  }

  render() {
    const { filterOn, filterValid } = this.props
    return (
      <div className="row">
        <div id="searchbar-container" className="col-lg-8 col-lg-offset-2">
          <form onSubmit={this.handleSearch}>
            <input
              type="text"
              id="search-form"
              className="form-control"
              placeholder="Course name"
              value={this.state.text}
              onChange={this.handleTextChange}
            />
          </form>
          <div id="search-button-container">
            <span
              className="glyphicon glyphicon-search"
              onClick={this.handleSearch}
            />
            <span
              className={`glyphicon glyphicon-filter ${filterValid ? 'filter-valid' : ''}`}
              id={ filterOn ? 'filter-open' : null }
              onClick={this.toggleFilter}
            />
            <span
              className="glyphicon glyphicon-refresh"
              onClick={this.resetFilter}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const filterOn = state.filter.panel
  const filterValid = !defaultQuery.equals(state.query)
  return { filterOn, filterValid }
}

export default connect(mapStateToProps)(SearchBar)

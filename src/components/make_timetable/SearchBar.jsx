import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toggleFilter } from '../../actions'

class Search extends Component {
  constructor() {
    super()
    this.state = { text: '' }
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value })
  }

  handleSearch(e) {
    this.props.handleSearch({title: this.state.text})
  }

  toggleFilter() {
    const { dispatch } = this.props
    dispatch(toggleFilter())
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
  const { filterOn } = state
  return { filterOn }
}

export default connect(mapStateToProps)(Search)

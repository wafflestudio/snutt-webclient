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
        <div className="input-group col-lg-8 col-lg-offset-1">
          <input
            type="text"
            className="form-control"
            placeholder="Course name"
            value={this.state.text}
            onChange={this.handleTextChange}
          />
          <span className="input-group-btn">
            <button
              onClick={this.handleSearch}
              type="submit"
              className="btn btn-default"
              value="Post"
            >
              <span className="glyphicon glyphicon-search" aria-hidden="true"/>
            </button>
          </span>
          <span className="input-group-btn">
            <button
              onClick={this.toggleFilter}
              type="submit"
              className={ filterOn ? 'btn btn-primary' : 'btn btn-default' }
              value="Post"
            >
              <span className='glyphicon glyphicon-filter' aria-hidden="true" />
            </button>
          </span>
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

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { sendQuery, toggleTimeselect } from '../../../actions'
import SearchBar from './SearchBar.jsx'
import SearchFilter from './SearchFilter.jsx'
import ModalWrapper from '../Common/ModalWrapper.jsx'
import TimeQuery from './TimeQuery.jsx'

class Search extends Component {
  constructor() {
    super()
    this.composeQuery = this.composeQuery.bind(this)
    this.toggleTimeselect = this.toggleTimeselect.bind(this)
  }

  composeQuery(txt) {
    let { dispatch, current, queries } = this.props
    const query = { year: current.year, semester: current.semester, title: txt, limit: 200 }

    // Add valid(?) fields to query
    for (let key in queries) {
      const value = queries[key]
      if (typeof(value) === "object" && value.length > 0)
        query[key] = value
    }
    if (query.time_mask.filter(mask => mask !== 0).length === 0)
      delete query.time_mask

    dispatch(sendQuery(query))
  }

  toggleTimeselect() {
    this.props.dispatch(toggleTimeselect())
  }

  render() {
    const { filterOn, selectingTime } = this.props
    return(
      <div>
        { selectingTime ?
          <ModalWrapper
            fullScreen={true}
            handleClose={this.toggleTimeselect}
          >
            <TimeQuery />
          </ModalWrapper> :
          null
        }
        <SearchBar
          handleSearch={txt => this.composeQuery(txt)}
        />
        <SearchFilter
          on={filterOn}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { dispatch, courseBook, query,
          filter: { panel: filterOn, time: selectingTime } } = state
  return { dispatch, current: courseBook.get('current'), filterOn, selectingTime,
          queries: query.toJS() }
}

export default connect(mapStateToProps)(Search)

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

  composeQuery(query) {
    const { dispatch, current } = this.props
    dispatch(sendQuery(Object.assign(query, {
      year: current.year,
      semester: current.semester,
    })))
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
          handleSearch={query => this.composeQuery(query)}
        />
        <SearchFilter
          on={filterOn}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { dispatch, courseBook,
          filter: { panel: filterOn, time: selectingTime } } = state
  return { dispatch, current: courseBook.get('current'), filterOn, selectingTime }
}

export default connect(mapStateToProps)(Search)

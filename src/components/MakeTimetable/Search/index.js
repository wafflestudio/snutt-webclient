import React, { Component } from 'react'
import { connect } from 'react-redux'

import { sendQuery } from '../../../actions'
import SearchBar from './SearchBar.jsx'
import SearchFilter from './SearchFilter.jsx'
import ModalWrapper from '../Common/ModalWrapper.jsx'
import TimeQuerySelector from './TimeQuerySelector.jsx'

class Search extends Component {
  constructor() {
    super()
    this.composeQuery = this.composeQuery.bind(this)
    this.state = { selectingTime: true }
  }

  composeQuery(query) {
    const { dispatch, courseBook } = this.props
    dispatch(sendQuery(Object.assign(query, {
      year: courseBook.year,
      semester: courseBook.semesterIdx,
    })))
  }

  render() {
    const { filterOn } = this.props
    return(
      <div>
        { this.state.selectingTime ?
          <ModalWrapper fullscreen={true}>
            <TimeQuerySelector />
          </ModalWrapper> :
          null
        }
        <SearchBar
          handleSearch={query => this.composeQuery(query)}
        />
        <SearchFilter on={filterOn} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { dispatch, courseBook, filterOn } = state
  return { dispatch, courseBook, filterOn }
}

export default connect(mapStateToProps)(Search)

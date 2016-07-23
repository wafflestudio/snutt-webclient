import React, { Component } from 'react'
import { connect } from 'react-redux'

import { sendQuery } from '../../../actions'
import SearchBar from './SearchBar.jsx'
import SearchFilter from './SearchFilter.jsx'
import ModalWrapper from '../Common/ModalWrapper.jsx'
import TimeQuery from './TimeQuery.jsx'

class Search extends Component {
  constructor() {
    super()
    this.composeQuery = this.composeQuery.bind(this)
    this.state = { selectingTime: false }
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
          <ModalWrapper
            fullScreen={true}
            handleClose={()=> this.setState({selectingTime: false})}
          >
            <TimeQuery />
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

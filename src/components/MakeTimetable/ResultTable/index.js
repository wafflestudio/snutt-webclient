import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loading from 'react-loading'

import ResultTabs from './ResultTabs.jsx'
import ResultRow from './ResultRow.jsx'
import { selectCourse, unselectCourse, addCourse } from '../../../actions'

class ResultTable extends Component {
  constructor(props) {
    super(props)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.state = {
      selectedIdx: -1,
      searching: true,
    }
  }

  handleAdd(idx) {
    this.props.dispatch(addCourse(this.props.searchResults[idx]))
  }

  handleSelect(idx) {
    const { dispatch } = this.props
    if (idx == this.state.selectedIdx) {
      this.setState({ selectedIdx: -1 })
      dispatch(unselectCourse())
    } else {
      this.setState({ selectedIdx: idx })
      dispatch(selectCourse(this.props.searchResults[idx]))
    }
  }

  handleToggle() {
    this.setState({ searching: !this.state.searching })
  }

  render() {
    const { searching } = this.state
    const { searchResults, timeTables } = this.props
    let data = (searching ? searchResults : timeTables.tables.get(timeTables.currentIndex).toArray())

    return(
      <div>
        <ResultTabs
          searching={this.state.searching}
          handleToggle={this.handleToggle}
        />
        <div className='result-wrapper'>
          <table className="table table-hover resultTable">
            <thead>
              <tr>
                <th className='col-course-no'>과목</th>
                <th className='col-lecture-no'>강좌</th>
                <th className='col-title'>이름</th>
                <th className='col-department'>학과</th>
                <th className='col-time'>시간</th>
                <th className='col-professor'>교수</th>
                <th className='col-remark'>비고</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.isQuerying ?
                <tr>
                  <td colSpan='6'><Loading type='spin' color='#e3e3e3' /></td>
                </tr> :
                null
              }
              {
                data.map((key, idx) => (
                  <ResultRow {...key}
                    key={key._id}
                    handleSelect={this.handleSelect.bind(this, idx)}
                    handleAdd={this.handleAdd.bind(this, idx)}
                    isSelected={this.state.selectedIdx == idx}
                  />
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { isQuerying, searchResults, timeTables }  = state;
  return { isQuerying, searchResults, timeTables }
}

export default connect(mapStateToProps)(ResultTable)
